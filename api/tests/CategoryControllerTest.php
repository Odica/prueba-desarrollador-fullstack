<?php
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../controllers/CategoryController.php';

class CategoryControllerTest extends TestCase {
    private $categoryController;

    protected function setUp(): void {
        $this->categoryController = new CategoryController();
    }

    public function testCreateCategory() {
        $name = "Categoría de prueba";
        $token = $this->categoryController->auth->login("test@prueba.com", "password123");

        $result = $this->categoryController->createCategory($name, $token);
        $this->assertTrue($result);
    }

    public function testGetCategories() {
        $categories = $this->categoryController->getCategories();
        $this->assertIsArray($categories);
    }
}
