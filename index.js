import { fastify } from 'fastify'
// import { adressMemory } from './database-memory.js' // usar database local na memória, descomente e comente a linha de baixo
import { adressMemory } from './database-postgres.js'

const server = fastify()

const database = new adressMemory ()

/* server.post('/adress/test', async (request, reply) => {
    const { cep, estado, cidade, bairro, numero, complemento} = request.body
    const result = await database.returnIfexists({
        cep,
        estado,
        cidade,
        bairro, 
        numero, 
        complemento 
    })

    return result}); // teste que retorna true ou false se existe na DB o endereco */ 

server.post('/adress', async (request, reply) => {
    const { cep, estado, cidade, bairro, numero, complemento} = request.body

    const result = await database.returnIfexists({
        cep,
        estado,
        cidade,
        bairro, 
        numero, 
        complemento 
    })

    if (cep.length != 8 
        || estado.length > 2 
        || cidade.length > 50 
        || bairro.length > 50 
        || numero.length > 10 
        || complemento.length > 50
        || result ){
            return reply.status(500).send()
    }

    else{
        await database.create({
            cep,
            estado,
            cidade,
            bairro, 
            numero, 
            complemento 
        })

        return reply.status(201).send()}
    });

server.get('/adress', async (request) => {
    const search = request.query.search
    
    const adress = await database.list(search)

    return adress
});

server.put('/adress/:adress_id', async (request, reply) => {
    const adressId = request.params.adress_id
    const { cep, estado, cidade, bairro, numero, complemento} = request.body
    
    if (cep.length != 8 
        || estado.length > 2 
        || cidade.length > 50 
        || bairro.length > 50 
        || numero.length > 10 
        || complemento.length > 50){
            return reply.status(500).send()
    }
    else{
        await database.update(adressId, {
        cep,
        estado,
        cidade,
        bairro,
        numero,
        complemento,
    })
    }
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

