export const MENSAGENS = {
	erro: {
		aviso: {
			idInvalido: 'Id deve ser um número inteiro positivo.\n',
			mensagemInvalida: 'A mensagem deve ser preenchida.\n',
			validadeInvalida: 'Data inválida, utilize o formato dd/mm/AAAA.\n',
			periodosExibicaoVazio:
				'O aviso deve conter pelo menos um período de exibição selecionado.\n',
			publicosAlvoVazio: 'O aviso deve conter pelo menos um público-alvo selecionado.\n',
			cadastroInvalido: 'Não foi possível cadastrar aviso.\n',
			edicaoInvalida: 'Não foi possível editar aviso.\n',
			consultaInvalida: 'Não foi possível consultar avisos.\n',
		},
		setor: {
			idInvalido: 'Id deve ser um número inteiro positivo.\n',
			escolherSetor: 'Escolha um setor.\n',
			nomeInvalido: 'O campo nome não pode ser vazio.\n',
			corInvalida: 'Cor inválida. Utilize o formato hexadecimal: #XXXXXX.\n',
			cadastroInvalido: 'Não foi possível cadastrar setor.\n',
			consultaInvalida: 'Não foi possível consultar setores.\n',
		},
		publicoAlvo: {
			idInvalido: 'Id deve ser um número inteiro positivo.\n',
			escolherPublicoAlvo: 'Escolha um público-alvo.\n',
			descricaoInvalida: 'O campo descrição não pode ser vazio.\n',
			cadastroInvalido: 'Não foi possível cadastrar público-alvo.\n',
			consultaInvalida: 'Não foi possível consultar públicos-alvo.\n',
		},
		periodoExibicao: {
			idInvalido: 'Id deve ser um número inteiro positivo.\n',
			descricaoInvalida: 'O campo descrição não pode ser vazio.\n',
			escolherPeriodoExibicao: 'Escolha um período de exibição.\n',
			consultaInvalida: 'Não foi possível consultar períodos de exibição.\n',
		},
		usuario: {
			idInvalido: 'Id deve ser um número inteiro positivo.\n',
			nomeInvalido: 'O campo nome não pode ser vazio.\n',
			nomeNaoPreenchido: 'O campo nome deve ser preenchido.\n',
			loginInvalido: 'O campo login não pode ser vazio.\n',
			hashSenhaInvalida: 'O campo senha não pode ser vazio.\n',
			cadastroInvalido: 'Não foi possível cadastrar usuário.\n',
			consultaInvalida: 'Não foi possível consultar os usuários.\n',
			loginMalSucedido: 'Login mal-sucedido\n',
		},
		conexao: {
			conexaoInvalida: 'Não foi possível conectar',
		},
	},
	sucesso: {
		aviso: {
			cadastradoComSucesso: 'Aviso cadastrado com sucesso.\n',
			excluidoComSucesso: 'Aviso excluído com sucesso.\n',
			editadoComSucesso: 'Aviso editado com sucesso.\n',
			clonadoComSucesso: 'Aviso clonado com sucesso.\n',
		},
		setor: {
			cadastradoComSucesso: 'Setor cadastrado com sucesso.\n',
		},
		publicoAlvo: {
			cadastradoComSucesso: 'Público-alvo cadastrado com sucesso.\n',
		},
		usuario: {
			cadastradoComSucesso: 'Usuário cadastrado com sucesso.\n',
		},
	},
};
