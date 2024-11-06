<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/User.php';

class AuthController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    private $table="users";

    public function register($username, $email, $password) {
        $user = new User($this->db);
        $user->username = $username;
        $user->email = $email;
        $user->password = $password;

        return $user->register();
    }

    public function login($email, $password) {
        $user = new User($this->db);
        $user->email = $email;

        $user_data = $user->login();
        if ($user_data && password_verify($password, $user_data['password'])) {
            $token = bin2hex(random_bytes(16));
            $user->id = $user_data['id'];
            $user->updateToken($token);
            return $token;
        }
        return null;
    }

    public function verifyToken($token) {
        $query = "SELECT * FROM " . $this->table . " WHERE token = :token";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":token", $token);
        $stmt->execute();
    
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // Si el token es válido, devolver los datos del usuario
        if ($user) {
            return $user; // Asegúrate de que devuelva un array con el user_id
        }
        
        return null; // Si el token no es válido, devuelve null
    }
}

