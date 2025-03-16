import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class adressMemory{
    #adress = new Map()

    async list(search = '') {
        const searchTerm = search

        const adress = await sql`select * from endereco where estado ilike ${'%' +search + '%'}`
        
        return adress
    }

    async returnIfexists(adress) {
        const {cep, estado, cidade, bairro, numero, complemento} = adress

        const searchOndatabase = await sql`select * from endereco where estado ilike ${'%' +estado + '%'} and cidade ilike ${'%' +cidade + '%'} and bairro ilike ${'%' +bairro + '%'} and numero ilike ${'%' +numero + '%'} and cep ilike ${'%' +cep + '%'}`
        if (searchOndatabase[0] === undefined){
            return false
        }
        else{
            return true
        }
    }

    async create(adress) { 
        const adress_Id = randomUUID()
        const {cep, estado, cidade, bairro, numero, complemento} = adress

        await sql`insert into endereco (id, cep, estado, cidade, bairro, numero, complemento) VALUES (${adress_Id}, ${cep}, ${estado}, ${cidade}, ${bairro}, ${numero}, ${complemento})`
    }

    async update(adressId, adress){
        const {cep, estado, cidade, bairro, numero, complemento} = adress
        await sql `update endereco set cep = ${cep}, estado =${estado}, cidade = ${cidade}, bairro = ${bairro}, numero = ${numero}, complemento = ${complemento} WHERE id = ${adressId}` 

    }

    async delete(adressId) {
        await sql`DELETE FROM endereco WHERE id = ${adressId}`
    }
}