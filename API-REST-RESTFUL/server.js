// Express: MicroFramework que ajuda a criar um servidor (obs: precisa instalar as suas dependências com o yarn/npm)
const express = require("express");
const app = express();

/*users do BD(salve os dados em um arquivo .json): https://jsonplaceholder.typicode.com/users*/ 
const data = require("./data.json");//banco de dados teste

app.use(express.json());//pedindo para o express usar o json

/* Verbos/Methods HTTP */
// GET: Receber dados de um Resource.
// POST: Enviar dados ou informações para serem processados por um Resource.
// PUT: Atualizar dados de um Resource.
// DELETE: Deletar um Resource.

//Obs: Resource/Recurso seria o bloquinho de notas do garçon/API, onde ele anota as coisas/pedidos

// Endpoint: ex: http://localhost:3000/clients => local onde chamamos o garçon/API

app.get("/clients", function(request, response){
    response.json(data);
});

app.get("/clients/:id", function(request, response){
    const { id } = request.params;//parametro de id de cliente requerido/buscado

    // Verificando se há o cliente no servidor/BD
    const client = data.find(cli => cli.id == id); 

    // Caso não encotre o cliente no servidor - retornar Status Code adequado
    if(!client) return response.status(204).json(); // => mais correto para essa situção/caso
    // if(!client) return response.status(404).json();


    //Response / Resposta da requisição
    response.json(client);

});


app.post("/clients", function(request, response){
    // pegando os dados que seriam supostamente salvos
    const { name, email } = request.body;

    // Aqui salvaria os dados

    //Response / Resposta da requisição
    response.json({ name, email });
    
});

app.put("/clients/:id", function(request, response){
    //parametro de id de cliente requerido/buscado
    const { id } = request.params;
    // Verificando se há o cliente no servidor
    const client = data.find(cli => cli.id == id);

    // Caso não encotre o cliente no servidor - retornar Status Code adequado
    if(!client) return response.status(204).json();

    // Adicionando novo nome a um cliente
    const { name } = request.body;
    client.name = name;

    // Response / Resposta em formato JSON
    response.json(client);

});

app.delete("/clients/:id", function(request, response){
    //parametro de id de cliente requerido/buscado para ser excluido
    const { id } = request.params;
    // Filtrando quais os clientes que não serão excluidos
    const clientsFiltered = data.filter(client => client.id != id);

    // Response / Resposta em formato JSON lista de clientes restantes
    response.json(clientsFiltered);
});


/* Crição do Servidor */
app.listen(3000, function(){
    console.log("Server is running!");
});