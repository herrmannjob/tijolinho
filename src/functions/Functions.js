import { Auth } from 'aws-amplify'
import { DataStore, Predicates } from 'aws-amplify'
import axios from 'axios'

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
            console.log(items)
            if (items.length > 0) {
                return { status: 'ok', data: items[0] }
            } else return { status: 'empty' }
        } catch (error) {
            return { status: 'error', error }
        }
    },

    //=== BUSCAR ENDEREÇO PELO CEP ===//
    async searchCep(cep) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            return {staus: 'ok', data: response.data}
        } catch (error) {
            return { status: 'error', error }
        }
    },

    //=== CRIAR UMA COR BASEADO NO CPF DO CLIENTE ===//
    selectColor(number) {
        const hue = number * 137.508
        return `hsl(${hue},50%,50%)`
    },

    //====== TABELAS DO BANCO ======//

    //=== LISTAR ===//
    
    //= BASEADO NUM USUÁRIO ESPECÍFICO =//
    async getByUserId (table, id) {
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

    //= BASEADO NUM ID ESPECÍFICO =//
    async getById (table, id) {
        try {
            const data = await DataStore.query(table, id)
            return { status: 'ok', data }
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
            const response = await DataStore.save(
                new table(data)
            )
            return { status: 'ok', data: response }
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