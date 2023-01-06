# IF Control API

API em NodeJS e Express.js para o Back-End do projeto.

## Setup 

### Dependências

- [NodeJS](https://nodejs.org/uk/blog/release/v16.13.0/) v16.13;
- [Yarn](https://yarnpkg.com/);
- [TypeScript](https://www.typescriptlang.org/);
- [PostgreSQL](https://www.postgresql.org/);
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript).

### Instalação Local

Este é um passo a passo para a realição de uma instalação local da aplicação; A instalação em um servidor web poderá variar de acordo com o provedor utilizado para a hospedagem.

1. Crie um diretório local e clone o repositório:

```
$ mkdir backend
$ cd backend
$ git clone https://github.com/IF-Control/app-backend.git .
```

2. Copie o arquivo *.env.example* e renomeie-o para *.env* e cole novamente o arquivo *.env.example*. Agora, configure nele a sua chave do JWT, a conexão com o banco de dados, a porta em que o serviço vai rodar e a timezone desejada.

3. Para criar a migration e poder utilizar o banco de dados no servidor local rode o seguinte comando:

```
$ yarn prisma migrate dev
```

4. Para rodar a aplicação, digite a sequência de comandos em seu terminal:

```
$ yarn install
$ yarn dev
```

## Equipe

* [Débora Miyake](https://github.com/DeboraMiyake)
* [Victor Sousa](https://github.com/VictorPSousa)

## Erros e bugs

Se algo não está funcionando corretamente, isso é um bug e deve ser reportado.

[Reporte aqui um bug ou erro por meio das issues](https://github.com/IF-Control/app-backend/issues).

## Como contribuir

Todas as contribuições são bem-vindas. Sugerimos usar este workflow:
 
1. Faça um Fork no projeto;
2. Crie um branch: `git checkout -b nome_da_branch`;
3. Faça a sua adição de funcionalidade ou correção de bug e faça o commit: `git commit -m 'mensagem_descritiva_do_commit'`;
4. Envie uma Pull Request com a descrição do seu trabalho.

## Copyright

© Copyright 2022 IF Control, Débora Miyake & Victor Sousa. 

## Licença

Lançado com a licença [MIT](https://github.com/IF-Control/app-backend/blob/main/LICENSE).
