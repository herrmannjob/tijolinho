
import axios from 'axios'

const functions = {

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
}

export default functions