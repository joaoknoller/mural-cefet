--
-- ESTRUTURA DO BANCO DE DADOS
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
CREATE DATABASE IF NOT EXISTS `sistema_avisos`;

USE `sistema_avisos`;

CREATE TABLE IF NOT EXISTS `aviso` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `mensagem` text COLLATE utf8_general_ci,
  `eh_urgente` tinyint(1) DEFAULT NULL,
  `setor_id` int(11) NOT NULL,
  `validade` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `setor` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome` varchar(40) NOT NULL UNIQUE,
  `cor_em_hex` char(7) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `publico_alvo` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `descricao` text COLLATE utf8_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `publico_alvo_aviso` (
  `aviso_id` int(11) NOT NULL,
  `publico_alvo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `periodo_exibicao` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `descricao` text COLLATE utf8_general_ci,
  `hora_inicio` TIME COLLATE utf8_general_ci,
  `hora_fim` TIME COLLATE utf8_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `periodo_exibicao_aviso` (
  `aviso_id` int(11) NOT NULL,
  `periodo_exibicao_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `aviso` ADD CONSTRAINT `fk__setor_id` FOREIGN KEY (`setor_id`) REFERENCES `setor` (`id`);

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome` varchar(100) NOT NULL,
  `login` varchar(8) NOT NULL,
  `hash_senha` char(64) NOT NULL,
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

COMMIT;