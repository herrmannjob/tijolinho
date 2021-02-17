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

    // ID DO USER LOGADO, NO BANCO
    async wichUserId (table, email) {
        try {
            const items = await DataStore.query(table, d => d.email("eq", email))
            if (items.length > 0) {
                return { status: 'ok', data: items[0].id }
            } else return { status: 'empty' }
        } catch (error) {
            return { status: 'error', error }
        }
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
                    data.push(item)
                })
                return { status: 'ok', data }
            } else return { status: 'empty' }
        } catch (error) {
            return { status: 'error', error }
        }
    },

    //= TODOS DA TABELA =//
    async getAll (table) {
        try {
            let data = []
            const items = await DataStore.query(table, Predicates.ALL)
            if (items.length > 0) {
                items.map(item => {
                    data.push(item)
                })
                return { status: 'ok', data }
            } else return { status: 'empty' }
        } catch (error) {
            return { status: 'error', error }
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
            return { status: 'error', error }
        }
    },

    //=== DELETAR ===//
    async deleteData (table, id) {
        try {
            const modelToDelete = await DataStore.query(table, id)
            DataStore.delete(modelToDelete)
            return { status: 'ok' }
        } catch (error) {
            return { status: 'error', error }
        }
        
    }
}

export default functions