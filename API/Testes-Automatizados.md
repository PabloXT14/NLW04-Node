# Testes Automatizados

## 1 - Testes Unitários
- Testam funcionalidades específicas de sua aplicação, no entanto, não realizam testes de acesso ao banco de dados ou a uma API externa.

## 2 - Teste de Integração
- Testam todas as funcinalidades de sua aplicação, é um teste como um todo.
- No caso de nossa aplicação temos a seguinte sequência de funcionalidades:

=> *request* -> routes -> controller -> repository
<- repository <- controller <- *response* <=

* Obs: vamos utilizar o "yarn add jest @types/jest -D" para o teste de integração em nossa aplicação

## Ponta a Ponta (E2E - End Two End)
- Neste é testado todas as ações que o usuário pode realizar na aplicação, como inserção de dados, clicar em cadastrar, recarregar a página, ...
- É mais utilizado na parte do Front-End.