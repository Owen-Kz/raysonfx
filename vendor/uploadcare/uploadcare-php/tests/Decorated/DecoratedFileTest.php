<?php declare(strict_types=1);

namespace Tests\Decorated;

use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Utils;
use PHPUnit\Framework\TestCase;
use Tests\DataFile;
use Uploadcare\Apis\FileApi;
use Uploadcare\Configuration;
use Uploadcare\File\File;
use Uploadcare\Interfaces\Api\FileApiInterface;
use Uploadcare\Interfaces\File\FileInfoInterface;
use Uploadcare\Interfaces\Serializer\SerializerInterface;
use Uploadcare\Security\Signature;
use Uploadcare\Serializer\SerializerFactory;

class DecoratedFileTest extends TestCase
{
    private SerializerInterface $serializer;

    protected function setUp(): void
    {
        parent::setUp();
        $this->serializer = SerializerFactory::create();
    }

    protected function fakeApi(array $responses = []): FileApiInterface
    {
        if (empty($responses)) {
            $responses = [
                new Response(200, [], Utils::streamFor(DataFile::fopen('file-info.json', 'rb'))),
            ];
        }

        $handler = new MockHandler($responses);
        $client = new Client(['handler' => HandlerStack::create($handler)]);
        $config = new Configuration(
            'public-key',
            new Signature('private-key'),
            $client,
            $this->serializer
        );

        return new FileApi($config);
    }

    /** @noinspection PhpParamsInspection */
    public function testCallInnerMethod(): void
    {
        $fileInfo = $this->serializer->deserialize(DataFile::contents('file-info.json'), File::class);
        self::assertInstanceOf(FileInfoInterface::class, $fileInfo);

        $decoratedFile = new \Uploadcare\File($fileInfo, $this->fakeApi());
        self::assertInstanceOf(FileInfoInterface::class, $decoratedFile->store());
    }

    public function commonMethods(): array
    {
        return [
            ['getDatetimeRemoved'],
            ['getDatetimeStored'],
            ['getDatetimeUploaded'],
            ['getContentInfo'],
            ['isImage'],
            ['isReady'],
            ['getMimeType'],
            ['getOriginalFileUrl'],
            ['getOriginalFilename'],
            ['getSize'],
            ['getUrl'],
            ['getUuid'],
            ['getVariations'],
            ['getSource'],
        ];
    }

    /**
     * @dataProvider commonMethods
     *
     * @noinspection PhpParamsInspection
     */
    public function testParentMethods(string $method): void
    {
        $fileInfo = $this->serializer->deserialize(DataFile::contents('file-info.json'), File::class);
        $decoratedFile = new \Uploadcare\File($fileInfo, $this->fakeApi());

        self::assertSame($fileInfo->{$method}(), $decoratedFile->{$method}());
    }

    public function testStoreActiveFile(): void
    {
        $responses = [
            new Response(200, [], Utils::streamFor(DataFile::fopen('file-info.json', 'rb'))),
            new Response(200, [], Utils::streamFor(DataFile::fopen('file-info.json', 'rb'))),
        ];
        $api = $this->fakeApi($responses);
        $result = $api->fileInfo(\uuid_create());
        self::assertInstanceOf(\Uploadcare\File::class, $result);
        self::assertInstanceOf(\Uploadcare\File::class, $result->store());
    }

    public function testDeleteActiveFile(): void
    {
        $responses = [
            new Response(200, [], Utils::streamFor(DataFile::fopen('file-info.json', 'rb'))),
            new Response(200, [], Utils::streamFor(DataFile::fopen('file-info.json', 'rb'))),
        ];
        $api = $this->fakeApi($responses);
        $result = $api->fileInfo(\uuid_create());
        self::assertInstanceOf(\Uploadcare\File::class, $result);
        self::assertInstanceOf(File::class, $result->delete());
    }

    public function testActiveFileCopyToLocalStorage(): void
    {
        $responses = [
            new Response(200, [], Utils::streamFor(DataFile::fopen('file-info.json', 'rb'))),
            new Response(200, [], Utils::streamFor(DataFile::fopen('copy-to-local-storage-api-response.json', 'rb'))),
        ];
        $api = $this->fakeApi($responses);
        $result = $api->fileInfo(\uuid_create());
        self::assertInstanceOf(\Uploadcare\File::class, $result->copyToLocalStorage());
    }

    public function testActiveFileCopyToRemoteStorage(): void
    {
        $responses = [
            new Response(200, [], Utils::streamFor(DataFile::fopen('file-info.json', 'rb'))),
            new Response(200, [], Utils::streamFor(DataFile::fopen('copy-to-remote-storage-api-response.json', 'rb'))),
        ];
        $api = $this->fakeApi($responses);
        $result = $api->fileInfo(\uuid_create());
        self::assertStringContainsString('//', $result->copyToRemoteStorage('some target'));
    }
}
