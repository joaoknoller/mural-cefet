--
-- DADOS INICIAIS
--

INSERT INTO `setor` (`id`, `nome`, `cor_em_hex`) VALUES (1, 'secretaria', '#FBFFC3');
INSERT INTO `setor` (`id`, `nome`, `cor_em_hex`) VALUES (2, 'diretoria', '#F0FFFF');

INSERT INTO `publico_alvo` (`id`, `descricao`) VALUES (1, 'Alunos');
INSERT INTO `publico_alvo` (`id`, `descricao`) VALUES (2, 'Professores');

INSERT INTO `periodo_exibicao` (`id`, `descricao`, `hora_inicio`, `hora_fim`) VALUES (1, 'Manha', '00:00', '12:59');
INSERT INTO `periodo_exibicao` (`id`, `descricao`, `hora_inicio`, `hora_fim`) VALUES (2, 'Tarde', '13:00', '17:59');
INSERT INTO `periodo_exibicao` (`id`, `descricao`, `hora_inicio`, `hora_fim`) VALUES (3, 'Noite', '18:00', '23:59');

INSERT INTO `aviso` (`id`, `mensagem`, `eh_urgente`, `setor_id`, validade) VALUES
(1, 'Anim Lorem magna eiusmod ea est ipsum sit. Dolor ad nisi ullamco sit aute proident consectetur veniam sunt cillum. Quis minim laborum in voluptate sint reprehenderit deserunt laboris irure.', 1, 1, '2022-01-01'),
(2, 'Aliqua minim enim irure velit aute laborum aliqua ut eu pariatur in. Incididunt ullamco tempor enim ad reprehenderit ad in id.', 0, 1, '2022-01-01'),
(3, 'Sed aliquam malesuada leo, sed pellentesque sem maximus quis. Mauris dictum pharetra dui eu venenatis. Vestibulum ullamcorper neque nunc, at tincidunt porttitor at.', 1, 1, '2022-01-01'),
(4, 'Cras rutrum volutpat magna, feugiat laoreet leo ultricies semper.', 0, 2, '2022-10-01'),
(5, 'Cras a imperdiet eros. Aenean non egestas ex, sit amet pretium justo.', 1, 2, '2022-10-01'),
(6, 'Phasellus vulputate pharetra accumsan. Sed sit amet urna metus.', 0, 2, '2022-10-01'),
(7, 'Vivamus gravida dolor quis arcu gravida ultrices.', 1, 1, '2022-10-01'),
(8, 'Morbi ligula tellus, dapibus placera et, auctor nec ante.', 0, 1, '2022-10-01');

INSERT INTO `publico_alvo_aviso` (`aviso_id`, `publico_alvo_id`) VALUES 
('1', '1'),('1', '2'),('2', '1'),('3', '1'),('4', '2'),('5', '2'),('6', '1'),('7', '1'),('8', '1');
INSERT INTO `periodo_exibicao_aviso` (`aviso_id`, `periodo_exibicao_id`) VALUES 
('1', '1'),('1', '2'),('2', '3'),('3', '1'),('4', '3'),('5', '2'),('6', '3'),('7', '3'),('8', '3');

INSERT INTO `usuario` (`id`, `nome`, `login`, `hash_senha`) VALUES ('1', 'Usuario Teste', 'teste', '3a1019e9a1bc8d711974f16eaca2153d7bb903347e8df5d408659025d7677c16'); -- Hash de 12345678