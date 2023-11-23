# Nerd Cuca

Um app em reactjs + nodejs + chatgpt para criação de receitas com os ingredientes que temos em casa

## Pré-requisitos

- nodejs instalado (versão 16.18.1 ou superior) [Download](https://nodejs.org/en/download)
- Criar conta na [openai (chatgpt)](https://chat.openai.com/auth/login)
- Criar uma **chave token** para poder utilizar a api do chatgpt. [Como criar uma chave](https://comunidadedeestatistica.com.br/como-criar-uma-chave-token-para-api-do-chatgpt/)

## Configuração

Crie um arquivo **.env** na raiz do projeto **nerd-cuca-api** com as seguintes environments:
```
OPENAI_KEY=<CHAVE_TOKEN_GERADA_CHATGPT>
OPENAI_MODEL=gpt-3.5-turbo
PORT=3001
```

## Comandos

### nerd-cuca-api
`npm install`
`tsc`
`node dist/app.js`

### nerd-cuca-web
`npm install`
`npm start`