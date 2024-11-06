<?php
class Post {
    private $conn;
    private $table = "posts";

    public $id;
    public $title;
    public $content;
    public $category_id;
    public $user_id;  // Agregar user_id al modelo

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table . " SET title=:title, content=:content, category_id=:category_id, user_id=:user_id";
        $stmt = $this->conn->prepare($query);

        // Bindear los parámetros
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":content", $this->content);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":user_id", $this->user_id); // Asignar el user_id aquí

        return $stmt->execute();
    }

    public function getAll() {
        $query = "SELECT posts.*, categories.name AS category_name, users.username AS author 
                  FROM " . $this->table . " 
                  JOIN categories ON posts.category_id = categories.id 
                  JOIN users ON posts.user_id = users.id";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
