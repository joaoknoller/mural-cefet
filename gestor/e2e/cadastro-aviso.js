Feature('Cadastro de aviso');

Before(({ I }) => {
    I.amOnPage('/');
    I.click('a[href="/avisos/cadastrar"]');
});

Scenario('Não escolher setor deve exibir erro', ({ I }) => {
    I.click('#formulario-aviso button');
    I.see('Escolha um setor.\n', '#mensagens.erro');
});

Scenario('Não inserir mensagem deve exibir erro', ({ I }) => {
    I.click('#setorId');
    I.selectOption('#setorId', 'secretaria');
    I.click('#formulario-aviso button');
    I.see('A mensagem deve ser preenchida.\n', '#mensagens.erro');
});

Scenario('Não inserir data deve exibir erro', ({ I }) => {
    I.click('#setorId');
    I.selectOption('#setorId', 'secretaria');
    I.fillField('#mensagem', 'Mensagem válida');
    I.click('#formulario-aviso button');
    I.see('Data inválida, utilize o formato dd/mm/AAAA.\n', '#mensagens.erro');
});

Scenario('Não selecionar ao menos um período de exibição deve exibir erro', ({ I }) => {
    I.click('#setorId');
    I.selectOption('#setorId', 'secretaria');
    I.fillField('#mensagem', 'Mensagem válida');
    I.fillField('#validade', '01-01-2023');
    I.click('#formulario-aviso button');
    I.see('O aviso deve conter pelo menos um período de exibição selecionado.\n', '#mensagens.erro');
});

Scenario('Não selecionar ao menos um público-alvo deve exibir erro', ({ I }) => {
    I.click('#setorId');
    I.selectOption('#setorId', 'secretaria');
    I.fillField('#mensagem', 'Mensagem válida');
    I.fillField('#validade', '01-01-2023');
    I.checkOption('Manha')
    I.click('#formulario-aviso button');
    I.see('O aviso deve conter pelo menos um público-alvo selecionado.\n', '#mensagens.erro');
});