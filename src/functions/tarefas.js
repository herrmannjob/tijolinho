// import { Tarefa } from '@/models'
// import Functions from '@/functions/Functions'
// import reforma from './templates/reforma.json';
// import reforma_zero from './templates/reforma_zero.json';
// // var _GLOBAL_ID = 1

// class TarefaWrapper {
// 	constructor(nome){
// 		this.nome = nome
// 		this.filhos = []
// 		this.origem = null
// 		this.STATUS = 0
// 		this.ID = 0
// 	}
// 	addFilho(filho){
// 		this.filhos.push(filho)
// 		filho.addOrigem(this)
// 	}
// 	addOrigem(origem){
// 		this.origem = origem
// 	}
// 	async sendToAmplify() {
// 		if (this.origem) {
// 			if (this.origem.ID == 0){
// 				this.origem.sendToAmplify()
// 			}
// 		}
// 		const response = await Functions.putData(Tarefa, {
// 			"CronogramaObra": this.nome/* Provide a CronogramaObra instance here */,
// 			"Responsavel": this.nome/* Provide a Usuario instance here */,
// 			"status": this.nome/* Provide a StatusTarefa instance here */,
// 			"nome_tarefa": this.nome,
// 			"data_inicio": '2021-02-01',
// 			"data_fim": '2021-02-01',
// 			"TarefaOrigem": this.nome/* Provide a Tarefa instance here */
// 		})
// 		console.log(response);
		
// 		// console.log(this.nome);
// 		// this.ID = _GLOBAL_ID++;
// 		// console.log(this.ID);
// 	}
// 	delete() {
// 		if (this.origem){
// 			this.filhos.map( key => {
// 				key.addOrigem(this.origem) | this.origem.addFilho(key)
// 			})
// 			this.origem.filhos = this.origem.filhos.filter(key => key.nome.localeCompare(this.nome))
// 		}
// 	}
// }
// function getTemplate(template) {
// 	var _json;
// 	if(template == 1){
// 		//reforma
// 		_json = reforma;
// 	}else{
// 		//reforma do zero
// 		_json = reforma_zero;
// 	}
// 	return _json
// }
// const Tarefas = {
// 	addChildren (key, mapTarefas, prefix) {
// 		var father = key[0]
// 		var children = key[1]
// 		var father_prefix = String(prefix + '.' + father)
// 		mapTarefas.set(father_prefix, new TarefaWrapper(father))
// 		console.log("estou procurando pelo "+prefix)
// 		if (mapTarefas.get(prefix) != undefined){
// 			console.log("colocando", father_prefix, "no", father_prefix)
// 			mapTarefas.get(prefix)
// 				.addFilho(mapTarefas.get(father_prefix))
// 		}
// 		mapTarefas.get(father_prefix)
// 			.addOrigem(mapTarefas.get(prefix))
// 		children.map(key => {
// 			Tarefas.addChildren(Object.entries(key)[0]
// 				, mapTarefas, father_prefix)
// 		})
// 	},

// 	serializeToMap (mapJson, mapTarefas) {
// 		Object.entries(mapJson).map(key => {
// 			Tarefas.addChildren(key, mapTarefas, '')
// 		})
// 	},

// 	serializeJson(jsonFile) {
// 		var mapJson = JSON.parse(jsonFile)
// 		var mapTarefas = new Map()
// 		Tarefas.serializeToMap(mapJson, mapTarefas)
// 		return mapTarefas
// 	},

// 	deleteFromMapTarefas(mapTarefas, key){
// 		var element = mapTarefas.get(key)
// 		if (element){
// 			element.delete()
// 			mapTarefas.delete(key)
// 		}
// 	},
// };
// export default Tarefas