import Setor from "../app/src/model/setor";
import { MENSAGENS } from "../app/src/util/constantes";

describe('Valida setores', () => {
    it('Setor com mensagem vazia deve lançar exceção', () => {
        expect(() => {
            const setor = new Setor(1, '', '#FFFFFF')
            setor.validar();
        }).toThrow(MENSAGENS.erro.setor.nomeInvalido);
    });

    it('Setor com tamanho da variavel cor menor que o padrão deve lançar exceção', () => {
        expect(() => {
            const setor = new Setor(1, 'Nome válido', '#FFFFF')
            setor.validar();
        }).toThrow(MENSAGENS.erro.setor.corInvalida);
    });

    it('Setor com tamanho da variavel cor maior que o padrão deve lançar exceção', () => {
        expect(() => {
            const setor = new Setor(1, 'Nome válido', '#FFFFFFF')
            setor.validar();
        }).toThrow(MENSAGENS.erro.setor.corInvalida);
    });
});