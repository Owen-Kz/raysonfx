<?php declare(strict_types=1);

namespace Tests;

use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ServerException;
use GuzzleHttp\Exception\TooManyRedirectsException;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\TestCase;
use Uploadcare\Exception\HttpException;

class HttpExceptionTest extends TestCase
{
    public function provideHttpExceptions(): array
    {
        $request = new Request('GET', 'https://localhost');

        return [
            [new RequestException('Wrong Request', $request, new Response(400))],
            [new TooManyRedirectsException('Too many redirects', $request, new Response(400))],
            [new ConnectException('Cant connect', $request)],
            [new ServerException('Server made a boo-boo', $request, new Response(400))],
            [new \RuntimeException('Some fail', 400)],
        ];
    }

    /**
     * @dataProvider provideHttpExceptions
     */
    public function testExceptionMessages(\Exception $exception): void
    {
        $httpException = new HttpException('', 0, $exception);
        self::assertStringContainsString($exception->getMessage(), $httpException->getMessage());
    }

    public function testEmptyMessageInException(): void
    {
        $ex = new ServerException('', new Request('GET', 'https://localhost'), new Response(503));
        $httpException = new HttpException('', 503, $ex);
        self::assertStringContainsString('Fail', $httpException->getMessage());
        self::assertEquals(503, $httpException->getCode());
    }
}
