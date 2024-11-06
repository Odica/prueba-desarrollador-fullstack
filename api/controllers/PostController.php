<?php
require_once __DIR__ . "/../config/Database.php";
require_once __DIR__ . "/../models/Post.php";
require_once __DIR__ . "/AuthController.php";

class PostController {
    private $db;
    public $auth;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->auth = new AuthController();
    }

    public function createPost($title, $content, $category_id, $token) {
        // Verificar si el token es válido
        $user = $this->auth->verifyToken($token);
        
        if (!$user) {
            error_log("Invalid token: " . $token); // Para verificar qué token se está enviando
            return "Invalid token"; // El token no es válido o no se encuentra en la base de datos
        }
    
        // Obtener el user_id automáticamente desde el token
        $user_id = $user['id']; // Aquí obtienes el 'id' del usuario asociado al token
        
        // Crear el post
        $post = new Post($this->db);
        $post->title = $title;
        $post->content = $content;
        $post->category_id = $category_id;
        $post->user_id = $user_id; // Asignar el user_id automáticamente
        
        return $post->create();
    }
    
    

    public function getPosts() {
        $post = new Post($this->db);
        return $post->getAll();
    }
}
?>
