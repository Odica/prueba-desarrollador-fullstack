<?php
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../controllers/AuthController.php';

class AuthControllerTest extends TestCase {
    private $authController;

    protected function setUp(): void {
        $this->authController = new AuthController();
    }

    public function testRegister() {
        $username = "usuario prueba";
        $email = "test@prueba.com";
        $password = "password123";

        $result = $this->authController->register($username, $email, $password);
        $this->assertTrue($result);
    }

    public function testLogin() {
        $email = "test@prueba.com";
        $password = "password123";

        $token = $this->authController->login($email, $password);
        $this->assertNotNull($token);
    }

    public function testVerifyToken() {
        $token = $this->authController->login("test@prueba.com", "password123");
        $user = $this->authController->verifyToken($token);

        $this->assertIsArray($user);
        $this->assertArrayHasKey('id', $user);
    }
}
