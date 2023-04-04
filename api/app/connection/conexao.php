<?php

class Conexao {

    public static $instance;

    private function __construct() {

    }

    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new PDO(
                'mysql:host=localhost;dbname=sistema_avisos', 
                'root', 
                '', 
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        }
        return self::$instance;
    }
}
