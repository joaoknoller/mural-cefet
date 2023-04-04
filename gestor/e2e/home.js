Feature('Página Inicial');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('Carrega página inicial do gestor', ({ I }) => {
    I.see('Home');
});