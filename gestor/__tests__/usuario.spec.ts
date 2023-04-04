import Usuario from "../app/src/model/usuario";
import { MENSAGENS } from "../app/src/util/constantes";

describe('Valida usuários', () => {
    it('Usuário com dados válidos não deve lançar exceção', () => {
        expect(() => {
            const usuario = new Usuario(1, 'usuario', 'u5u4r10', '123456');
            usuario.validar();
        }).not.toThrow(MENSAGENS.erro.usuario.nomeNaoPreenchido);
    });

    it('Usuário com nome vazio deve lançar exceção', () => {
        expect(() => {
            const usuario = new Usuario(1, '', 'u5u4r10', '123456');
            usuario.validar();
        }).toThrow(MENSAGENS.erro.usuario.nomeInvalido);
    });

    it('Usuário com id negativo deve lançar exceção', () => {
        expect(() => {
            const usuario = new Usuario(-1, 'usuario', 'u5u4r10', '123456');
            usuario.validar();
        }).toThrow(MENSAGENS.erro.usuario.idInvalido);
    });

    it('Usuário com login vazio deve lançar exceção', () => {
        expect(() => {
            const usuario = new Usuario(1, 'usuario', '', '123456');
            usuario.validar();
        }).toThrow(MENSAGENS.erro.usuario.loginInvalido);
    });

    it('Usuário com senha vazia deve lançar exceção', () => {
        expect(() => {
            const usuario = new Usuario(1, 'usuario', 'u5u4r10', '');
            usuario.validar();
        }).toThrow(MENSAGENS.erro.usuario.hashSenhaInvalida);
    });
});