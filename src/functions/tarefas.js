// import { DataStore } from 'aws-amplify'
var _GLOBAL_ID = 1
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
	sendToAmplify() {
		if (this.origem) {
			if (this.origem.ID == 0){
				this.origem.sendToAmplify()
			}
		}
		// send to amplify
        console.log(this.nome);
        this.ID = _GLOBAL_ID++;
        console.log(this.ID);
	}
}
const _json = `{"tarefa": [{"filho1": []}, {"filho2": []}]}`;
const Tarefas = {

  addChildren (key, mapTarefas, prefix) {
	var father = key[0]
	var children = key[1]
	var father_prefix = String(prefix + '.' + father)
	mapTarefas.set(father_prefix, new TarefaWrapper(father))
	if (mapTarefas.get('.' + prefix) != undefined){
		mapTarefas.get('.'+ prefix)
			.addFilho(mapTarefas.get(father_prefix))
	}
	mapTarefas.get(father_prefix)
		.addOrigem(mapTarefas.get('.' + prefix))
	children.map(key => {
		Tarefas.addChildren(Object.entries(key)[0]
			, mapTarefas, father)
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

async cadastra(){
    console.log('oi');
    console.log(Tarefas.serializeJson(_json));
    Tarefas.serializeJson(_json).forEach(key => {
        key.sendToAmplify()
    });
}
};
export default Tarefas