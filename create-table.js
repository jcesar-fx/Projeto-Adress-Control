import { sql } from "./db.js"; // comente a seção de dropar tabela para criar, e comente a seção de criar tabela para deletar as tabelas
/* sql`DROP TABLE IF EXISTS endereco`.then(() => {
    console.log('tabela dropada!')
}) */
sql`
CREATE TABLE endereco (
    id TEXT PRIMARY KEY,
    cep TEXT,
    estado TEXT,
    cidade TEXT,
    bairro TEXT,
    numero TEXT,
    complemento TEXT
);
`.then(() => {
    console.log('tabela criada!')
})