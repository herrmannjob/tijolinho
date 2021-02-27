<template>
    <v-btn
      class="ma-2"
      outlined
      color="indigo"
      @click="seed"
    >
      Carregar dados nas tabelas
    </v-btn>
</template>

<script>
import { DataStore } from 'aws-amplify'
import { Endereco, Empresa, TipoUsuario, TipoObra, Obra, Usuario, CronogramaObra, StatusTarefa, Tarefa } from '@/models'
import Functions from '@/functions/Functions'
export default {
  name: 'Seed',
  data () {
    return {
        usuarioID: '4a6aa294-5f12-49f5-8685-6f9b2e8a8b87',
        endereco: null,
        empresa: null,
        tipo_usuario: null,
        tipo_obra: null,
        obra: null,
        usuario: null,
        cronograma_obra: null,
        status_tarefa: null,
        tarefa_origem: null,
        tarefa: null
    }
  },
  methods: {
    async seed () {
        try {
            await this.getData(Obra)
            // await this.updateData(Empresa, 'c9e3c3ac-bc0d-4e4b-9cb4-58b931a1c820')
            // await this.putEndereco()
            // await this.putTipoUsuario()
            // await this.putUsuario()
            // await this.putEmpresa()
            // await this.putTipoObra()
            // await this.putObra()
            // await this.putCronogramaObra()
            // await this.putStatusTarefa()
            // await this.putTarefaOrigem()
            // await this.putTarefa()
        } catch (error) {
            console.log('error: ' + error)
        }
        
    },
    async getData (table) {
        const data = await Functions.getAll(table)
        console.log(data)
        // return data

        //===DELETE ALL DATA===//
        // data.data.map(d => {
        //     this.delAllData(table, d.id)
        // })
    },
    async delAllData(table, id) {
        const del = await Functions.deleteData(table, id)
        console.log(del)
        
    },
    async updateData(table, id) {
        const empresa = await DataStore.query(table, id)
        const empresa_clientes = []
        for (let i = 0; i < 6; i++) {
            empresa_clientes.push(empresa.usuarioID[i])
        }
        console.log(empresa_clientes)
        const response = await DataStore.save(
            Empresa.copyOf(empresa, updated => {
                updated.usuarioID = empresa_clientes
            })
        )
        console.log(response)
    },
    async putEndereco () {
        const data = await this.getData(Endereco)
        if (data.status === 'empty') {
            try {
                const request = await DataStore.save(
                    new Endereco({
                        "cep": "12345678",
                        "bairro": "Nosso bairro",
                        "cidade": "Cidade Fantasma",
                        "rua": "Rua da imaginação",
                        "estado": "SD",
                        "pais": "SeedIn",
                        "numero": "123"
                    })
                )
                console.log('Endereco criado')
                this.endereco = request
            } catch (error) {
                console.log('error: ' + error)
            }
        } else {
            this.endereco = data.data[0]
            console.log(this.endereco)
        }
    },
    async putTipoUsuario () {
        const data = await this.getData(TipoUsuario)
        if (data.status === 'empty') {
            try {
                const request = await DataStore.save(
                    new TipoUsuario({
                        "nome": "Cliente"
                    })
                )
                console.log('Tipo Usuário criado')
                this.tipo_usuario = request
            } catch (error) {
                console.log('error: ' + error)
            }
            
        } else {
            this.tipo_usuario = data.data[data.data.length - 1]
            console.log(this.tipo_usuario)
        }
    },
    async putUsuario () {
        const data = await this.getData(Usuario)
        if (data.status === 'empty') {
            try {
                const request = await DataStore.save(
                    new Usuario({
                        "nome": "Cliente 01",
                        "email": "cliente01@outlook.com",
                        "telefone": "+55 84 98126 5062",
                        "cpf": "06292744442",
                        "data_nascimento": "1984-09-12Z",
                        "data_nascimento_conjuge": "1990-04-18Z",
                        "nome_conjuge": "Esposa 01",
                        "Empresas": [],
                        "Obra": [],
                        "Endereco": this.endereco,
                        "TipoUsuario": this.tipo_usuario
                    })
                )
                console.log('Usuário criado')
                this.usuario = request
                this.usuarioID = request.id
            } catch (error) {
                console.log('error: ' + error)
            }
        } else {
            this.usuario = data.data[0]
            this.usuarioID = this.usuario.id
            console.log(this.usuario)
        }
    },
    async putEmpresa () {
        // const data = await this.getData(Empresa)
        // if (data.status === 'empty') {
            try {
                const request = await DataStore.save(
                    new Empresa({
                        "nome": "Empresa Teste",
                        "cnpj": "1234567890",
                        "telefone": "+55 84 98126 5062",
                        "email": "teste@empresateste.com",
                        "usuarioID": ["26787605-76d9-40ec-a5f3-0b0dd4365e9e", "2f3f359c-25b6-4efd-9130-ad006e916bcd", "5ef6893c-b92f-437a-ac22-37a7d34c1ce5"],
                        "Endereco": this.endereco
                    })
                )
                console.log('Empresa criada')
                this.empresa = request
            } catch (error) {
                console.log('error: ' + error)
            }
            
        // } else {
        //     this.empresa = data.data[0]
        //     console.log(this.empresa)
        // }
    },
    async putTipoObra () {
        const data = await this.getData(TipoObra)
        if (data.status === 'empty') {
            try {
                const request = await DataStore.save(
                    new TipoObra({
                        "nome": "Reforma Teste",
                        "template": "Lorem ipsum"
                    })
                )
                console.log('Tipo Obra criada')
                this.tipo_obra = request
            } catch (error) {
                console.log('error: ' + error)
            }
        } else {
            this.tipo_obra = data.data[0]
            console.log(this.tipo_obra)
        }
    },
    async putObra () {
        const data = await this.getData(Obra)
        if (data.status === 'empty') {
            try {
                const request = await DataStore.save(
                    new Obra({
                        "nome": "Obra Seed 2",
                        "Endereco": this.endereco,
                        "TipoObra": this.tipo_obra,
                        "Empresa": this.empresa,
                        "usuarioID": this.usuarioID,
                        "Usuarios": ["633654da-2aae-467e-9030-f60a717d56e7"]
                    })
                )
                console.log('Obra criada')
                this.obra = request
            } catch (error) {
                console.log('error: ' + error)
            }
        } else {
            this.obra = data.data[0]
            console.log(this.obra)
        }
    },
    async putCronogramaObra () {
        const data = await this.getData(CronogramaObra)
        if (data.status === 'empty') {
            try {
                const request = await DataStore.save(
                    new CronogramaObra({
                        "Obra_": this.obra,
                        "data_inicio": "2021-02-18Z",
                        "data_fim": "2021-02-25Z",
                        "tempo_previsto": "",
                        "gasto_previsto": ""
                    })
                )
                console.log('cronograma obra criado')
                this.cronograma_obra = request
            } catch (error) {
                console.log(error)
            }
        } else {
            this.cronograma_obra = data.data[data.data.length - 1]
            console.log(this.cronograma_obra)
        }
    },
    async putStatusTarefa () {
        const data = await this.getData(StatusTarefa)
        if (data.status === 'empty') {
            try {
                const request = await DataStore.save(
                    new StatusTarefa({
                        "status": "Finalizado"
                    })
                )
                console.log('status tarefa criado')
                this.status_tarefa = request
                console.log(this.status_tarefa)
            } catch (error) {
                console.log(error)
            }
        } else {
            this.status_tarefa = data.data[0] // 0 - "A iniciar"; 1 - "Iniciado"; 2 - "Parado"; 3 - "Finalizado"
            console.log(this.status_tarefa)
        }
    },
    async putTarefaOrigem () {
        const data = await this.getData(Tarefa)
        if (data.status === 'empty') {
            try {
                const request = await DataStore.save(
                    new Tarefa({
                        "nome_tarefa": "Pintura da casa",
                        "data_inicio": "2021-02-18Z",
                        "data_fim": "2021-02-25Z",
                        "CronogramaObra": this.cronograma_obra,
                        "Responsavel": this.usuario,
                        "status": this.status_tarefa,
                        // "TarefaOrigem": /* Provide a Tarefa instance here */
                    })
                )
                console.log('tarefa origem criada')
                this.tarefa_origem = request
                console.log(this.tarefa_origem)
            } catch (error) {
                console.log(error)
            }
        } else {
            this.tarefa_origem = data.data[0]
            console.log(this.tarefa_origem)
        } 
    },
    async putTarefa () {
        const data = await this.getData(Tarefa)
        if (data.status === 'empty') {
            try {
                const request = await DataStore.save(
                    new Tarefa({
                        "nome_tarefa": "Realizar a pintura",
                        "data_inicio": "2021-02-20Z",
                        "data_fim": "2021-02-25Z",
                        "CronogramaObra": this.cronograma_obra,
                        "Responsavel": this.usuario,
                        "status": this.status_tarefa,
                        "TarefaOrigem": this.tarefa_origem
                    })
                )
                console.log('tarefa criada')
                this.tarefa = request
                console.log(this.tarefa)
            } catch (error) {
                console.log(error)
            }
        } else {
            this.tarefa = data.data[data.data.length - 1]
            console.log(this.tarefa)
        } 
    }
  }
}
</script>
<style lang="css">
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  body{
    overflow-x: auto;
    overflow-y: auto;
  }
}
</style>
