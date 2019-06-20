# Web Teste

Essa é a aplicação web feita em React para o teste. Possui um sistema de autenticação básico, que se integra com a API criada para esse mesmo teste.

Tecnologias:
- React, com o boilerplate create-react-app
- React-Apollo, para a integração com o GraphQL
- React-router, para o sistema de roteamento da aplicação

O aplicativo possui:
- Tela de login
- Tela de cadastro
- Validação de login e cadastro
- Feedback para diversos erros e feedback para carregamento
- Checagem automática se o usuário já está logado (se estiver, é redirecionado)

O website pode ser acessado nesse endereço: https://zen-joliot-d94cc9.netlify.com. Alternativamente, é possível instalá-lo localmente.

# Instalação

Os passos abaixo assumem que você possui o yarn instalado globalmente. Caso não possua, basta apenas executar `npm -g install yarn`.

1. Clone esse repositório executando o seguinte comando:

```
git clone https://github.com/rodriigovieira/web-teste.git
```

2. Mude para o diretório do projeto:

```
cd web-teste
```

3. Instale as dependências do projeto:

```
yarn
```

4. Execute o projeto:

Para iniciar o projeto, execute o seguinte comando:

```
yarn start
```