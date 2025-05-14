# Golden Raspberry Awards API

API desenvolvida para processar e analisar dados históricos da premiação "Golden Raspberry Awards", com base em um arquivo CSV contendo os filmes indicados e vencedores.

## Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express.js**
- **better-sqlite3** (banco embarcado em memória)
- **csv-parse** para leitura do CSV
- **Jest** + **ts-jest** + **supertest** (testes de integração)
- **ESLint** + **Prettier** + **Husky** (qualidade de código)
- **Swagger** (documentação da API)

## Como rodar o projeto

### 0. Rodar com Docker
Caso tenha o Docker instalado, você pode rodar o projeto com o seguinte comando:

```bash
docker-compose up --build
```
Dessa forma, é possível pular para o passo 4
### 1. Clonar o repositório

```bash
git clone https://github.com/cirops/golden-raspberry-api.git
cd golden-raspberry-api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Executar o projeto

```bash
npm run dev
```
A API estará disponível em `http://localhost:3000`.

### 4. Consumir o endpoint

```http
GET http://localhost:3000/movies/intervals
```
Retorno no formato:
```json
{
  "min": [
    {
      "producer": "Joel Silver",
      "interval": 1,
      "previousWin": 1990,
      "followingWin": 1991
    }
  ],
  "max": [
    {
      "producer": "Matthew Vaughn",
      "interval": 13,
      "previousWin": 2002,
      "followingWin": 2015
    }
  ]
}
```

### 5. Executar os testes

```bash
npm run test
```

### 6. Consultar a documentação swagger
A documentação da API está disponível em `http://localhost:3000/docs`.

## Extras implementados
Algumas melhorias foram incluídas além do escopo solicitado com o objetivo de demonstrar boas práticas e facilitar a manutenção futura. Embora possam parecer supérfluas em um teste técnico pontual, esses ajustes — como validação de ambiente, uso de hooks de commit, organização em casos de uso e padronização de código — exigem pouco esforço inicial, mas oferecem grande retorno caso o projeto evolua ou precise ser mantido por outras pessoas. São escolhas que costumo adotar desde o início em projetos reais para garantir consistência, qualidade e escalabilidade desde os primeiros passos.

- Validação de variáveis ambiente e dados do CSV com Zod
- Prevenção de commits inválidos via Husky + Commitlint
- Regras de linting e formatação com ESLint e Prettier
- Documentação Swagger 