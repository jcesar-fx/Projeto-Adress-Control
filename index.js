/* import { createServer } from 'node:http'

const server = createServer((request, response) => {
    console.log("server is up!")

    response.write('testando o watch')
    return response.end()
});

server.listen(3000) */

import { fastify } from 'fastify'
// import { adressMemory } from './database-memory.js' // usar database local na memória, descomente e comente a linha de baixo
import { adressMemory } from './database-postgres.js'

const server = fastify()

const database = new adressMemory ()

server.post('/adress', async (request, reply) => {
    const { cep, estado, cidade, bairro, numero, complemento} = request.body

    await database.create({
        cep,
        estado,
        cidade,
        bairro, 
        numero, 
        complemento 
    })

    return reply.status(201).send()
}); 

server.get('/adress', async (request) => {
    const search = request.query.search
    
    const adress = await database.list(search)

    return adress
});

server.put('/adress/:adress_id', async (request, reply) => {
    const adressId = request.params.adress_id
    const { cep, estado, cidade, bairro, numero, complemento} = request.body
    
    await database.update(adressId, {
        cep,
        estado,
        cidade,
        bairro,
        numero,
        complemento,
    })

    return reply.status(204).send()
});

server.delete('/adress/:adress_id', async (request, reply) => {
    const adressId = request.params.adress_id

    await database.delete(adressId)

    return reply.status(204).send()
});

server.listen({
    port: process.env.PORT ?? 3333,
});

