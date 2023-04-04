import Aviso from '../app/src/model/aviso';
import PeriodoExibicao from '../app/src/model/periodo-exibicao';
import PublicoAlvo from '../app/src/model/publico-alvo';
import Setor from '../app/src/model/setor';
import { MENSAGENS } from '../app/src/util/constantes';

const setorValido = new Setor(1, 'Setor válido', '#FFFFFF');
const periodoExibicaoValido = [new PeriodoExibicao(0, '', new Date(), new Date())];
const publicoAlvoValido = [new PublicoAlvo(0, '')];
const dataValida = '01-01-1970';

describe('Valida avisos', () => {
  it('Aviso com dados válidos não deve lançar exceção', () => {
    expect(() => {
      const aviso = new Aviso(1, 'Mensagem válida', true, dataValida, setorValido, periodoExibicaoValido, publicoAlvoValido);
      aviso.validar();
    }).not.toThrow(MENSAGENS.erro.aviso.mensagemInvalida);
  });

  it('Aviso com mensagem vazia deve lançar exceção', () => {
    expect(() => {
      const aviso = new Aviso(1, '', true, dataValida, setorValido, periodoExibicaoValido, publicoAlvoValido);
      aviso.validar();
    }).toThrow(MENSAGENS.erro.aviso.mensagemInvalida);
  });

  it('Aviso com id negativo deve lançar exceção', () => {
    expect(() => {
      const aviso = new Aviso(-1, 'Mensagem válida', true, dataValida, setorValido, periodoExibicaoValido, publicoAlvoValido);
      aviso.validar();
    }).toThrow(MENSAGENS.erro.aviso.idInvalido);
  });

  it('Aviso com validade vazia deve lançar exceção', () => {
    expect(() => {
      const aviso = new Aviso(1, 'Mensagem válida', true, '', setorValido, periodoExibicaoValido, publicoAlvoValido);
      aviso.validar();
    }).toThrow(MENSAGENS.erro.aviso.validadeInvalida);
  });

  it('Aviso com array de períodos de exibição vazio deve lançar exceção', () => {
    expect(() => {
      const aviso = new Aviso(1, 'Mensagem válida', true, dataValida, setorValido, [], publicoAlvoValido);
      aviso.validar();
    }).toThrow(MENSAGENS.erro.aviso.periodosExibicaoVazio);
  });

  it('Aviso com array de públicos-alvo vazio deve lançar exceção', () => {
    expect(() => {
      const aviso = new Aviso(1, 'Mensagem válida', true, dataValida, setorValido, periodoExibicaoValido, []);
      aviso.validar();
    }).toThrow(MENSAGENS.erro.aviso.publicosAlvoVazio);
  });
});