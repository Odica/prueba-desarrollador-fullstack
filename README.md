Requisitos
Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

PHP 7.4 o superior
MySQL o MariaDB
Servidor Web (Apache o Nginx)
XAMPP, WAMP o similar (opcional)
Editor de texto (VS Code, Sublime Text, etc.)

Pasos para Configurar el Proyecto
1. Clonar el Repositorio
Primero, clona el repositorio en tu máquina local (si aún no lo has hecho):
git clone https://github.com/Odica/prueba-desarrollador-fullstack.git
cd prueba-desarrollador-fullstack

Configurar la Base de Datos
El proyecto requiere una base de datos MySQL/MariaDB que contiene las tablas necesarias para el funcionamiento de la API.

En la raíz del proyecto encontrarás el archivo prueba-tecnica.sql. Este archivo contiene las instrucciones necesarias para crear la base de datos y las tablas correspondientes.

Abre tu herramienta de administración de bases de datos preferida.

Importa las sentencias SQL del archivo

Configurar el Servidor Web
Si estás utilizando XAMPP o WAMP, asegúrate de que el servidor web (Apache) y MySQL estén activos. Si usas Nginx o Apache de forma independiente, asegúrate de que el servidor esté configurado para apuntar a la carpeta raíz de tu proyecto.

Configuración para XAMPP
Coloca el proyecto dentro de la carpeta htdocs de XAMPP (por defecto, C:\xampp\htdocs).
Accede a http://localhost/prueba-desarrollador-fullstack/frontend/index.html.
