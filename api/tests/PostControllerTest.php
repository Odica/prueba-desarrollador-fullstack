<?php
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../controllers/PostController.php';

class PostControllerTest extends TestCase {
    private $postController;

    protected function setUp(): void {
        $this->postController = new PostController();
    }

    public function testCreatePost() {
        $title = "Titulo de post aleatorio";
        $content = "Contenido del post :)";
        $category_id = 1;
        $token = $this->postController->auth->login("test@prueba.com", "password123");

        $result = $this->postController->createPost($title, $content, $category_id, $token);
        $this->assertTrue($result);
    }

    public function testGetPosts() {
        $posts = $this->postController->getPosts();
        $this->assertIsArray($posts);
    }
}
