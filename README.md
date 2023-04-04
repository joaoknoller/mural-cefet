# Sistema de Avisos

Sistema de Avisos para a Secretaria do CEFET/RJ Nova Friburgo

- Autores: alunos da disciplina de Projeto Integrador de Sistemas
- Supervisão: professor Thiago Delgado Pinto

## Desenvolvimento

Instalação de todas as dependências:
```bash
npm run setup
```

Execução de todos os testes:
```bash
npm run test
```

Verificação de cobertura geral:
```bash
npm run cov
```

Instalação e execução do json-server:
```bash
npm i -g json-server
json-server --watch db.json
```

Instalação e execução do codeceptjs:
```bash
npx codeceptjs init
    * Local: ./e2e/*.js
    * Driver: Playwright
    * Output: ./output
    * URL: http://127.0.0.1:5500/sistema-avisos/mural/app
    * Open browser: yes
    * Browser: chromium
npx codeceptjs def
npx codeceptjs def --config path/to/codecept.json
```

Outros scripts: `npm run`

👉 Executar o Sonar no projeto periodicamente.


## Documentação

- [Requisitos](doc/requisitos.md)
- [Requisitos Internos](doc/requisitos-internos.md)

