<?php
require_once "controllers/AuthController.php";
require_once "controllers/CategoryController.php";
require_once "controllers/PostController.php";

$authController = new AuthController();
$categoryController = new CategoryController();
$postController = new PostController();

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'];

switch ($endpoint) {
    case 'register':
        echo json_encode($authController->register($_POST['username'], $_POST['email'], $_POST['password']));
        break;
    case 'login':
        echo json_encode($authController->login($_POST['email'], $_POST['password']));
        break;
    case 'create_category':
        echo json_encode($categoryController->createCategory($_POST['name'], $_POST['token']));
        break;
    case 'get_categories':
        echo json_encode($categoryController->getCategories());
        break;
    case 'create_post':
        echo json_encode($postController->createPost($_POST['title'], $_POST['content'], $_POST['category_id'], $_POST['token']));
        break;
    case 'get_posts':
        echo json_encode($postController->getPosts());
        break;
    default:
        echo json_encode(["message" => "Endpoint not found"]);
}

