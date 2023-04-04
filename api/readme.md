# API

> API da solução

## Recursos

### Endpoint

-   `http://localhost:8080`

### Rotas

Aviso

1. GET
   `http://localhost:8080/avisos/:id`
   Retorna um array contendo os avisos encontrados.

#### Parâmetros

| Campo | Tipo              | Descrição         |
| ----- | ----------------- | ----------------- |
| id    | Number (opcional) | ID único do aviso |

#### Respostas

Sucesso 200 - OK

| Campo            | Tipo     | Descrição                                             |
| ---------------- | -------- | ----------------------------------------------------- |
| id               | Number   | ID único do aviso                                     |
| mensagem         | String   | Texto contido no aviso                                |
| ehUrgente        | Boolean  | Urgência do aviso                                     |
| setor            | Object   | Objeto do Setor de origem                             |
| publicosAlvo     | Object[] | Lista de objetos PublicoAlvo relacionados             |
| periodosExibicao | Object[] | Lista de objetos PeriodoExibicao relacionados         |
| validade         | Date     | Objeto do tipo Date representando a validade do aviso |

2. POST
   `http://localhost:8080/avisos/`
   Adiciona um aviso ao banco de dados.

#### Request Body

| Campo               | Tipo                   | Descrição                                          |
| ------------------- | ---------------------- | -------------------------------------------------- |
| mensagem            | String (obrigratório)  | Texto contendo a mensagem do aviso                 |
| ehUrgente           | Boolean (obrigatório)  | Urgência do aviso                                  |
| setorId             | Number (obrigatório)   | ID único do setor                                  |
| validade            | String (obrigatório)   | String no formado AAAA-mm-dd                       |
| publicosAlvoIds     | String[] (obrigatório) | Lista de ids dos públicos-alvo relacionados        |
| periodosExibicaoIds | String[] (obrigatório) | Lista de ids dos períodos de exibição relacionados |

#### Respostas

Sucesso 201 - Created

| Campo | Tipo   | Descrição         |
| ----- | ------ | ----------------- |
| id    | Number | ID único do aviso |

3. PUT
   `http://localhost:8080/avisos/:id`
   Edita um aviso do banco de dados.

#### Request Body

| Campo               | Tipo                   | Descrição                                          |
| ------------------- | ---------------------- | -------------------------------------------------- |
| mensagem            | String (obrigratório)  | Texto contendo a mensagem do aviso                 |
| ehUrgente           | Boolean (obrigatório)  | Urgência do aviso                                  |
| setorId             | Number (obrigatório)   | ID único do setor                                  |
| validade            | String (obrigatório)   | String no formado AAAA-mm-dd                       |
| publicosAlvoIds     | String[] (obrigatório) | Lista de ids dos públicos-alvo relacionados        |
| periodosExibicaoIds | String[] (obrigatório) | Lista de ids dos períodos de exibição relacionados |

#### Respostas

Sucesso 200 - OK

| Campo | Tipo   | Descrição         |
| ----- | ------ | ----------------- |
| id    | Number | ID único do aviso |

4. DELETE
   `http://localhost:8080/avisos/:id`
   Remove um aviso do banco de dados.

#### Parâmetros

| Campo | Tipo                 | Descrição         |
| ----- | -------------------- | ----------------- |
| id    | Number (obrigatório) | ID único do aviso |

#### Respostas

Sucesso 200 - OK

| Campo | Tipo   | Descrição         |
| ----- | ------ | ----------------- |
| id    | Number | ID único do aviso |

Setor

1. GET
   `http://localhost:8080/setores/:id`
   Retorna um array contendo os setores encontrados.

#### Parâmetros

| Campo | Tipo              | Descrição         |
| ----- | ----------------- | ----------------- |
| id    | Number (opcional) | ID único do setor |

#### Respostas

Sucesso 200 - OK

| Campo    | Tipo   | Descrição                   |
| -------- | ------ | --------------------------- |
| id       | Number | ID único do setor           |
| nome     | String | Nome do setor               |
| corEmHEX | String | Cor do setor no formato HEX |

2. POST
   `http://localhost:8080/setores/`
   Adiciona um setor ao banco de dados.

#### Request Body

| Campo    | Tipo                  | Descrição                   |
| -------- | --------------------- | --------------------------- |
| nome     | String (obrigratório) | Nome do setor               |
| corEmHEX | String (obrigatório)  | Cor do setor no formato HEX |

#### Respostas

Sucesso 201 - Created

| Campo | Tipo   | Descrição         |
| ----- | ------ | ----------------- |
| id    | Number | ID único do setor |

## Desenvolvimento

### Instalação

```bash
composer install
```

### Recarregamento do autoloader

```bash
composer dump-autoload
```

### Execução de testes

```bash
composer run-script test
```
