# API, REST e RESTFUL

## API

Cliente (Client - ex: app)
Garçon (pedidos, levar seus pedidos, para a cozinha) (API)
Cozinha (Server)

Acronimo de Application Programming Interface (Interface de Programação de Aplicações - API) é basicamente um conjunto de rotinas e padrões estabelecidos por uma aplicação, para que outras aplicações possam utilizar as funcionalidades desta aplicação.

- Responsável por estabelecer comunicação entre diferentes serviços.
- Meio de campo entre as tecnologias.
- Intermediador para troca de informações.

## REST

"O *REST* seriam as boas práticas entre cliente e cozinha (cliente e servidor), por exemplo, não tem um restaurante sujo para receber os clientes, ou o cliente não falar palavrões no restaurante"

Um acrônimo para Representational State Transfer (Transferência de Estado Representativo).

Será feita a transferência de dados de uma maneira simbólica, figurativa, representativa, de maneira didática.

A transferência de dados, geralmente, usando o protocolo HTTP.

O Rest, delimita algumas obrigações nessas transferências de dados.

Resources seria então, uma entidade, um objeto.

### 6 NECESSIDADES (constraints) para ser RESTful

- _Client-server_: Separação do cliente e do armazenamento de dados (servidor), dessa forma, poderemos ter uma portabilidade do nosso sistema, usando o React para WEB e React Native para o smartphone, por exemplo.

- _Stateless_(Sem Estado): Cada requisição que o cliente faz para o servidor, deverá conter todas as informações necessárias para o servidor entender e responder (RESPONSE) a requisição (REQUEST). Exemplo: A sessão do usuário deverá ser enviada em todas as requisições, para saber se aquele usuário está autenticado e apto a usar os serviços, e o  servidor não pode lembrar que o cliente foi autenticado na requisição anterior. 

- _Cacheable_: As respostas para uma requisição, deverão ser explicitas as dizer se aquela requisição, pode ou não ser cacheada pelo cliente (guardar atalhos de inicialização na memória em cache).

- _Layered System_: O cliente acessa a um endpoint, sem precisar saber da complexidade, de quais passos estão sendo necessários para o servidor responder a requisição, ou quais outras camadas o servidor estará lidando, para que a requisição seja respondida.
(em outras palavras: o cliente não precisa saber o caminho que o garçon utilizou para enviar seu pedido a cozinha)

- _Code on demand (optional)_: Dá a possibilidade da nossa aplicação pegar códigos, como o JavaScript, por exemplo, e executar no cliente.


## RESTFUL

RESTful, é a aplicação dos padrões REST.

## BOAS PRÁTICAS