import HTTPFalso from '../app/src/connection/http-falso';

describe('Aviso', () => {
    it('Deve retornar todos os avisos', async () => {
        const httpFalso = new HTTPFalso();
        const resultado = await httpFalso.get();
        expect(resultado).toEqual([]);
    });
});