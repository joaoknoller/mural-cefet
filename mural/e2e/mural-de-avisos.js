Feature('Mural de avisos');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('Carrega página inicial do mural', ({ I }) => {
    I.see('AVISOS');
    I.seeElement('#avisos-urgentes');
    I.seeElement('#avisos-nao-urgentes');
});