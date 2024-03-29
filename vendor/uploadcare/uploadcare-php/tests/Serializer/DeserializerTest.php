<?php declare(strict_types=1);

namespace Tests\Serializer;

use Faker\Factory;
use Faker\Generator;
use PHPUnit\Framework\TestCase;
use Uploadcare\File\ContentInfo\ImageInfo;
use Uploadcare\Interfaces\Serializer\SerializerInterface;
use Uploadcare\Serializer\Exceptions\ConversionException;
use Uploadcare\Serializer\Exceptions\SerializerException;
use Uploadcare\Serializer\Serializer;
use Uploadcare\Serializer\SnackCaseConverter;

class DeserializerTest extends TestCase
{
    private Generator $faker;

    protected function setUp(): void
    {
        $this->faker = Factory::create();
    }

    protected function getSerializer(): SerializerInterface
    {
        return new Serializer(new SnackCaseConverter());
    }

    /**
     * @return string JSON with image_info data
     */
    protected function getImageInfoJson(array $additionalData = []): string
    {
        $data = \json_decode(\file_get_contents(\dirname(__DIR__) . '/_data/file-info.json'), true);
        $imageInfo = $data['content_info']['image'];
        foreach ($additionalData as $key => $value) {
            $imageInfo[$key] = $value;
        }

        return \json_encode($imageInfo);
    }

    public function testDenormalizeImageInfo(): void
    {
        $serializer = $this->getSerializer();

        $lon = $this->faker->longitude;
        $lat = $this->faker->latitude;
        $date = \date_create();

        $imageInfo = $this->getImageInfoJson([
            'sequence' => true,
            'geo_location' => [
                'latitude' => $lat,
                'longitude' => $lon,
            ],
            'datetime_original' => $date->format('Y-m-d\TH:i:s.u\Z'),
        ]);

        /** @var ImageInfo $object */
        $object = $serializer->deserialize($imageInfo, ImageInfo::class);

        self::assertInstanceOf(ImageInfo::class, $object);

        self::assertEquals('RGB', $object->getColorMode());
        self::assertEquals(6, $object->getOrientation());
        self::assertEquals('HEIF', $object->getFormat());
        self::assertTrue($object->isSequence());
        self::assertEquals(4032, $object->getHeight());
        self::assertEquals(3024, $object->getWidth());
        self::assertEquals($lat, $object->getGeoLocation()->getLatitude());
        self::assertEquals($lon, $object->getGeoLocation()->getLongitude());
        self::assertInstanceOf(\DateTimeInterface::class, $object->getDatetimeOriginal());
        self::assertEquals([72, 72], $object->getDpi());
    }

    public function testNotSerializableClass(): void
    {
        $this->expectException(SerializerException::class);
        $this->getSerializer()->deserialize(\json_encode(\date_create()), \DateTime::class);
    }

    public function testUnableToDecode(): void
    {
        $this->expectException(ConversionException::class);
        $this->getSerializer()->deserialize(\date_create()->format(DATE_ATOM));
    }

    public function provideDateInDifferentFormats(): array
    {
        return [
            'Y-m-d\TH:i:s.u\Z' => ['2018-11-26T12:49:09.945335Z', null],
            'Y-m-d\TH:i:s\Z' => ['2018-11-26T12:49:09Z', null],
            'Y-m-d\TH:i:s' => ['2018-11-26T12:49:09', null],
            'Invalid' => ['26.11.2021', ConversionException::class],
        ];
    }

    /**
     * @dataProvider provideDateInDifferentFormats
     */
    public function testVariousDateFormats(string $date, string $exception = null): void
    {
        $serializer = $this->getSerializer();
        $denormalizeDate = (new \ReflectionObject($serializer))->getMethod('denormalizeDate');
        $denormalizeDate->setAccessible(true);

        if ($exception !== null) {
            $this->expectException($exception);
        }

        $result = $denormalizeDate->invokeArgs($serializer, [$date]);
        if ($exception === null) {
            self::assertInstanceOf(\DateTimeInterface::class, $result);
        }
    }
}
