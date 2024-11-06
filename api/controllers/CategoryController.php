<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/Category.php';
require_once __DIR__ . "/AuthController.php";

class CategoryController {
    private $db;
    private $auth;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->auth = new AuthController();
    }

    public function createCategory($name, $token) {
        if (!$this->auth->verifyToken($token)) {
            return "Invalid token";
        }

        $category = new Category($this->db);
        $category->name = $name;

        return $category->create();
    }

    public function getCategories() {
        $category = new Category($this->db);
        return $category->getAll();
    }
}
?>
