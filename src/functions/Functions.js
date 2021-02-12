import { Auth } from 'aws-amplify'
import { DataStore, Predicates } from 'aws-amplify'

const functions = {
    // LOGIN
    async login (email, password) {
        try {
            await Auth.signIn(email, password)
            return { status: 'ok' }
        } catch (error) {
            return { status: 'error', error }
        }
    },

    // USUÁRIO AUTENTICADO?
    async isAuth () {
        const response = await Auth.currentAuthenticatedUser()
        return response
    },

    //====== TABELAS DO BANCO ======//

    //=== LISTAR ===//
    
    //= BASEADO NUM ID ESPECÍFICO =//
    async getById (table, id) {
        try {
            let data = []
            const items = await DataStore.query(table, d => d.usuarioID("eq", id))
            if (items.length > 0) {
                items.map(item => {
                    data.push(item.nome)
                })
                return { status: 'ok', data }
            } else return { status: 'empty' }
        } catch (error) {
            return { status: "error", error }
        }
    },

    //= TODOS DA TABELA =//
    async getAll (table) {
        try {
            let data = []
            const items = await DataStore.query(table, Predicates.ALL)
            if (items.length > 0) {
                items.map(item => {
                    if (table.name === 'Tarefa') data.push({ title: item.nome_tarefa, start: item.data_inicio.substr(0, 10), end: item.data_fim.substr(0, 10) })
                    else data.push(item.nome)
                })
                return { status: 'ok', data }
            } else return { status: 'empty' }
        } catch (error) {
            return { status: "error", error }
        }
    },

    //=== INSERIR ===//

    async putData (table, data) {
        try {
            await DataStore.save(
                new table(data)
            )
            return { status: 'ok' }
        } catch (error) {
            return { status: "error", error }
        }
    }
}

export default functions