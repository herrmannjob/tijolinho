import { Tarefa } from '@/models'
import Functions from '@/functions/Functions'
// var _GLOBAL_ID = 1
class TarefaWrapper {
	constructor(nome){
		this.nome = nome
		this.filhos = []
		this.origem = null
		this.STATUS = 0
		this.ID = 0
	}
	addFilho(filho){
		this.filhos.push(filho)
		filho.addOrigem(this)
	}
	addOrigem(origem){
		this.origem = origem
	}
	async sendToAmplify() {
		if (this.origem) {
			if (this.origem.ID == 0){
				this.origem.sendToAmplify()
			}
		}
		const response = await Functions.putData(Tarefa, {
			// "CronogramaObra": /* Provide a CronogramaObra instance here */,
			// "Responsavel": /* Provide a Usuario instance here */,
			// "status": /* Provide a StatusTarefa instance here */,
			"nome_tarefa": this.nome,
			"data_inicio": '2021-02-01',
			"data_fim": '2021-02-01',
			// "TarefaOrigem": /* Provide a Tarefa instance here */
		})
		console.log(response);
		
		// send to amplify
		// console.log(this.nome);
		// this.ID = _GLOBAL_ID++;
		// console.log(this.ID);
	}
	delete() {
		if (this.origem){
			this.filhos.map( key => {
				key.addOrigem(this.origem) | this.origem.addFilho(key)
			})
			this.origem.filhos = this.origem.filhos.filter(key => key.nome.localeCompare(this.nome))
		}
	}
}
const _json = `{"avo": [{"tarefa": [{"filho1": []}, {"filho2": []}]}], "velho":[]}`;
const Tarefas = {
	addChildren (key, mapTarefas, prefix) {
		var father = key[0]
		var children = key[1]
		var father_prefix = String(prefix + '.' + father)
		mapTarefas.set(father_prefix, new TarefaWrapper(father))
		console.log("estou procurando pelo "+prefix)
		if (mapTarefas.get(prefix) != undefined){
			console.log("colocando", father_prefix, "no", father_prefix)
			mapTarefas.get(prefix)
				.addFilho(mapTarefas.get(father_prefix))
		}
		mapTarefas.get(father_prefix)
			.addOrigem(mapTarefas.get(prefix))
		children.map(key => {
			Tarefas.addChildren(Object.entries(key)[0]
				, mapTarefas, father_prefix)
		})
	},

	serializeToMap (mapJson, mapTarefas) {
		Object.entries(mapJson).map(key => {
			Tarefas.addChildren(key, mapTarefas, '')
		})
	},

	serializeJson(jsonFile) {
		var mapJson = JSON.parse(jsonFile)
		var mapTarefas = new Map()
		Tarefas.serializeToMap(mapJson, mapTarefas)
		return mapTarefas
	},

	deleteFromMapTarefas(mapTarefas, key){
		var element = mapTarefas.get(key)
		if (element){
			element.delete()
			mapTarefas.delete(key)
		}
	},

	async cadastra(){
		var mapTarefas = Tarefas.serializeJson(_json)
		mapTarefas.forEach(key => {
			key.sendToAmplify()
		});
	}
};
export default Tarefas