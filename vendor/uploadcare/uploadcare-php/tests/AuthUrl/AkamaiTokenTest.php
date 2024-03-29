<?php declare(strict_types=1);

namespace Tests\AuthUrl;

use PHPUnit\Framework\TestCase;
use Uploadcare\AuthUrl\Token\AkamaiToken;
use Uploadcare\AuthUrl\Token\TokenException;

class AkamaiTokenTest extends TestCase
{
    private string $key;

    protected function setUp(): void
    {
        parent::setUp();
        $this->key = \bin2hex(\random_bytes(32));
    }

    public function testEmptyTokenCreation(): void
    {
        $token = new AkamaiToken($this->key);
        $token->setAcl(\uuid_create());

        self::assertEquals($this->key, $token->getKey());
        self::assertNotEmpty($token->getToken());
        self::assertNotEmpty($token->getExpired());
    }

    public function testSetWrongKey(): void
    {
        $this->expectException(TokenException::class);
        new AkamaiToken('00~00');
        $this->expectExceptionMessageMatches('/Key must be a hex string/');
    }

    public function testSetInvalidAlgorithm(): void
    {
        $this->expectException(TokenException::class);
        $token = new AkamaiToken($this->key);
        $token->setAlgo('UNKNOWN');
        $this->expectExceptionMessageMatches('/Invalid algorithm/');
    }

    public function testNoAclInObject(): void
    {
        $this->expectException(TokenException::class);
        $token = new AkamaiToken($this->key);
        $token->getAcl();
        $this->expectExceptionMessageMatches('/You must set file uuid as ACL/');
    }

    public function testSetValidAlgorithm(): void
    {
        $token = new AkamaiToken($this->key);
        $token->setAlgo('sha256');
        self::assertEquals('sha256', $token->getAlgo());
    }
}
