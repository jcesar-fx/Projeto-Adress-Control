import { randomUUID } from 'node:crypto'

export class adressMemory{
    #adress = new Map()

    list(search) {
        return Array.from(this.#adress.entries())
        .map((adressArray) => {
            const id = adressArray[0]
            const data = adressArray[1]

            return {
                id,
                ...data
            }
        })
        .filter(adress => {
            if (search){
                return adress.cep.includes(search)
            }
            return true
        })
    }

    create(adress) {
        const adressId = randomUUID()
        this.#adress.set(adressId, adress)
    }

    update(adressId, adress){
        this.#adress.set(adressId, adress)
    }

    delete(adressId) {
        this.#adress.delete(adressId)
    }
}