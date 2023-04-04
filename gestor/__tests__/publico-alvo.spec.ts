import PublicoAlvo from "../app/src/model/publico-alvo";
import { MENSAGENS } from "../app/src/util/constantes";

describe('Valida públicos-alvo', () => {
    it('Público alvo com id igual a zero deve lançar exceção', () => {
        expect(() => {
            const publico = new PublicoAlvo(0, 'Nome válido');
            publico.validar();
        }).toThrow(MENSAGENS.erro.publicoAlvo.escolherPublicoAlvo);
    });

    it('Público alvo com id negativo deve lançar exceção', () => {
        expect(() => {
            const publico = new PublicoAlvo(-1, 'Nome válido');
            publico.validar();
        }).toThrow(MENSAGENS.erro.publicoAlvo.idInvalido);
    });

    it('Público alvo com mensagem vazia deve lançar exceção', () => {
        expect(() => {
            const publico = new PublicoAlvo(1, '');
            publico.validar();
        }).toThrow(MENSAGENS.erro.publicoAlvo.descricaoInvalida);
    });
});