import ControladoraListagemAvisos from './controller/controladora-listagem-avisos';
import ControladoraCadastroAviso from './controller/controladora-cadastro-aviso';
import ControladoraEdicaoAviso from './controller/controladora-edicao-aviso';
import ControladoraAutenticacao from './controller/controladora-autenticacao';
import ControladoraClonagemAviso from './controller/controladora-clonagem-aviso';
import ControladoraCadastroSetor from './controller/controladora-cadastro-setor';
import ControladoraListagemSetores from './controller/controladora-listagem-setores';
import Visao from './view/visao';

const controladoraCadastroAviso = new ControladoraCadastroAviso();
const controladoraListagemAvisos = new ControladoraListagemAvisos();
const controladoraEdicaoAviso = new ControladoraEdicaoAviso();
const controladoraClonagemAviso = new ControladoraClonagemAviso();
const controladoraCadastroSetor = new ControladoraCadastroSetor();
const controladoraListagemSetores = new ControladoraListagemSetores();
const controladoraAutenticacao = new ControladoraAutenticacao();
const visao = new Visao();

const regex = {
	index: /^\/$|^\/index|index.html\/?$/i, // / ou /index ou /index.html
	cadastrarAviso: /^\/$|^\/avisos\/cadastrar\/?$/i, // /avisos/cadastrar
	listarAvisos: /^\/$|^\/avisos\/listar\/[0-9]+\/?$/i, // /avisos/listar/:pagina
	editarAviso: /^\/$|^\/avisos\/editar\/[0-9]+\/?$/i, // /avisos/editar/:id
	clonarAviso: /^\/$|^\/avisos\/clonar\/[0-9]+\/?$/i, // /avisos/clonar
	cadastrarSetor: /^\/$|^\/setores\/cadastrar\/?$/i, // /setores/cadastrar
	listarSetores: /^\/$|^\/setores\/listar\/[0-9]+\/?$/i, // /setores/listar/:pagina
	autenticarUsuario: /^\/$|^\/autenticacao\/?$/i, // /autenticacao
};

async function carregarPagina(arquivo: string) {
	const resp = await fetch(arquivo);
	return resp.text();
}

window.addEventListener('load', async () => {
	const caminho = location.pathname;
	const templates = '/src/templates';
	const main = document.getElementsByTagName('main')[0];

	if (regex.index.test(caminho)) {
		main.innerHTML = await carregarPagina(`${templates}/home.html`);
	} else if (regex.cadastrarAviso.test(caminho)) {
		main.innerHTML = await carregarPagina(`${templates}/formulario-aviso.html`);
		controladoraCadastroAviso.executar();
	} else if (regex.editarAviso.test(caminho)) {
		main.innerHTML = await carregarPagina(`${templates}/formulario-aviso.html`);
		const id = +visao.pegarRota(3);
		controladoraEdicaoAviso.executar(id);
	} else if (regex.clonarAviso.test(caminho)) {
		main.innerHTML = await carregarPagina(`${templates}/formulario-aviso.html`);
		const id = +visao.pegarRota(3);
		controladoraClonagemAviso.executar(id);
	} else if (regex.listarAvisos.test(caminho)) {
		main.innerHTML = await carregarPagina(`${templates}/listagem.html`);
		const offset = +visao.pegarRota(3);
		controladoraListagemAvisos.executar(offset);
	} else if (regex.cadastrarSetor.test(caminho)) {
		main.innerHTML = await carregarPagina(`${templates}/formulario-setor.html`);
		controladoraCadastroSetor.executar();
	} else if (regex.listarSetores.test(caminho)) {
		main.innerHTML = await carregarPagina(`${templates}/listagem.html`);
		const offset = +visao.pegarRota(3);
		controladoraListagemSetores.executar(offset);
	} else if (regex.autenticarUsuario.test(caminho)) {
		main.innerHTML = await carregarPagina(`${templates}/formulario-autenticacao.html`);
		controladoraAutenticacao.executar();
	} else {
		main.innerHTML = await carregarPagina(`${templates}/404.html`);
	}
});
