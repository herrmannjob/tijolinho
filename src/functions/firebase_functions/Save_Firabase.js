// import * as firebase from '@/services/Firebase'
// const db = firebase.firestore();
// // const userId = firebase.auth().currentUser.uid;
// var x = new Empresa('empresa');
// x.addUsuariosIDs('01');
// var w = setData(x,'teste');
// console.log(w);
// async function setData(campo,title){
//     const data = await db.collection(campo.getTableName()).doc(title).set(campo.getMap())
//     .then(()=>{
//         // location.reload()
//         console.log('deu bom');
//     })
//     .catch(error =>{
//         console.error(error);
//     });
//     return data;
// }

// class Empresa {
//     constructor(nome, id_endereco, usuarioId = null, cnpj = null, telefone = null, email = null, foto = null) {
//         this.nome = nome;
//         this.cnpj = cnpj;
//         this.telefone = telefone;
//         this.email = email;
//         this.foto = foto;
//         this.id_endereco = id_endereco;
//         var usuariosIDs = [];
//         // this.usuariosIDs = [];
//         if (usuarioId != null)
//             this.usuariosIDs.push(usuarioId);

//         this.addUsuariosIDs = function (value) {
//             this.usuariosIDs.push(value);
//         };
//         this.removeUsuariosIDs = function (value) {
//             var indice = usuariosIDs.indexOf(value);
//             this.usuariosIDs.pud(indice);
//         };
//         this.getNome = function () {
//             return nome;
//         };
//         this.setNome = function (value) {
//             this.nome = value;
//         };
//         this.getTableName = function () {
//             return 'Empresa';
//         };
//         this.getMap = function () {
//             var map = new Object();
//             map["nome"] = this.nome;
//             map["cnpj"] = this.cnpj;
//             map["telefone"] = this.telefone;
//             map["email"] = this.email;
//             map["foto"] = this.foto;
//             map["id_endereco"] = this.id_endereco;
//             map["usuariosIDs"] = this.usuariosIDs;
//             return map;
//         }
//     }
// }
// // class Endereco {
// //     constructor(cep, bairro = null, cidade = null, rua = null, estado = null, pais = null, numero = null) {
// //         this.cep = cep;
// //         this.bairro = bairro;
// //         this.cidade = cidade;
// //         this.rua = rua;
// //         this.estado = estado;
// //         this.pais = pais;
// //         this.numero = numero;
// //         this.getTableName = function () {
// //             return 'Endereco';
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["cep"] = this.cep;
// //             map["bairro"] = this.bairro;
// //             map["cidade"] = this.cidade;
// //             map["rua"] = this.rua;
// //             map["estado"] = this.estado;
// //             map["pais"] = this.pais;
// //             map["numero"] = this.numero;
// //             return map;
// //         }
// //     }
// // }
// // class Usuario {
// //     constructor(nome, tipoUsuario, empresaId = null, obraId = null, email = null, telefone = null, cpf = null, data_nascimento = null, data_nascimento_conjuge = null, nome_conjuge = null, foto = null, endereco = null) {
// //         this.nome = nome;
// //         this.tipoUsuario = tipoUsuario;
// //         this.email = email;
// //         this.telefone = telefone;
// //         this.cpf = cpf;
// //         this.data_nascimento = data_nascimento;
// //         this.data_nascimento_conjuge = data_nascimento_conjuge;
// //         this.nome_conjuge = nome_conjuge;
// //         this.foto = foto;
// //         this.endereco = endereco;
// //         this.empresas = [];
// //         this.obra = [];
// //         if (empresaId != null)
// //             this.empresas.push(empresaId);
// //         if (obraId != null)
// //             this.obra.push(obraId);
// //         this.getTableName = function () {
// //             return 'Usuario';
// //         };
// //         this.addEmpresas = function (value) {
// //             this.empresas.push(value);
// //         };
// //         this.removeEmpresas = function (value) {
// //             var indice = empresas.indexOf(value);
// //             this.empresas.pud(indice);
// //         };
// //         this.addObra = function (value) {
// //             this.empresas.push(value);
// //         };
// //         this.removeObra = function (value) {
// //             var indice = obra.indexOf(value);
// //             this.obra.pud(indice);
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["nome"] = this.nome;
// //             map["tipoUsuario"] = this.tipoUsuario;
// //             map["email"] = this.email;
// //             map["telefone"] = this.telefone;
// //             map["cpf"] = this.cpf;
// //             map["data_nascimento"] = this.data_nascimento;
// //             map["data_nascimento_conjuge"] = this.data_nascimento_conjuge;
// //             map["nome_conjuge"] = this.nome_conjuge;
// //             map["foto"] = this.foto;
// //             map["endereco"] = this.endereco;
// //             map["empresas"] = this.empresas;
// //             map["obra"] = this.obra;
// //             return map;
// //         }
// //     }
// // }
// // class tipoUsuario {
// //     constructor(nome) {
// //         this.nome = nome;
// //         this.getNome = function () {
// //             return nome;
// //         };
// //         this.getTableName = function () {
// //             return 'tipoUsuario';
// //         };
// //         this.setNome = function (value) {
// //             this.nome = value;
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["nome"] = this.nome;
// //             return map;
// //         }
// //     }
// // }
// // class tipoObra {
// //     constructor(nome, template = null) {
// //         this.nome = nome;
// //         this.template = template;
// //         this.getTableName = function () {
// //             return 'tipoObra';
// //         };
// //         this.getNome = function () {
// //             return nome;
// //         };
// //         this.setNome = function (value) {
// //             this.nome = value;
// //         };
// //         this.getTemplate = function () {
// //             return template;
// //         };
// //         this.setTemplate = function (value) {
// //             this.template = value;
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["nome"] = this.nome;
// //             map["template"] = this.template;
// //             return map;
// //         }
// //     }
// // }
// // class Obra {
// //     constructor(nome, Endereco, TipoObra, Empresa, clienteID = null, arquitetoId = null, cor = null) {
// //         this.nome = nome;
// //         this.Endereco = Endereco;
// //         this.TipoObra = TipoObra;
// //         this.Empresa = Empresa;
// //         this.cor = cor;
// //         this.arquitetosId = [];
// //         this.clientesID = [];
// //         if (arquitetoId != null)
// //             this.arquitetosId.push(arquitetoId);
// //         if (clienteID != null)
// //             this.clientesID.push(clienteID);
// //         this.getTableName = function () {
// //             return 'Obra';
// //         };
// //         this.getCor = function () {
// //             return cor;
// //         };
// //         this.setCor = function (value) {
// //             this.cor = cor;
// //         };
// //         this.addArquiteto = function (value) {
// //             this.arquitetosId.push(value);
// //         };
// //         this.removeArquiteto = function (value) {
// //             var indice = this.arquitetosId.indexOf(value);
// //             this.arquitetosId.pud(indice);
// //         };
// //         this.addCliente = function (value) {
// //             this.clientesID.push(value);
// //         };
// //         this.removeCliente = function (value) {
// //             var indice = this.clientesID.indexOf(value);
// //             this.clientesID.pud(indice);
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["nome"] = this.nome;
// //             map["Endereco"] = this.Endereco;
// //             map["TipoObra"] = this.TipoObra;
// //             map["Empresa"] = this.Empresa;
// //             map["cor"] = this.cor;
// //             map["arquitetosId"] = this.arquitetosId;
// //             map["clientesID"] = this.clientesID;
// //             return map;
// //         }
// //     }
// // }
// // class CronogramaObra {
// //     constructor(obraId, data_inicio, data_fim, tempo_previsto = null, gasto_previsto = null) {
// //         this.obraId = obraId;
// //         this.data_inicio = data_inicio;
// //         this.data_fim = data_fim;
// //         this.tempo_previsto = tempo_previsto;
// //         this.gasto_previsto = gasto_previsto;
// //         this.getTableName = function () {
// //             return 'CronogramaObra';
// //         };
// //         this.getData_inicio = function () {
// //             return this.data_inicio;
// //         };
// //         this.setData_inicio = function (value) {
// //             this.data_inicio = value;
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["obraId"] = this.obraId;
// //             map["data_inicio"] = this.data_inicio;
// //             map["data_fim"] = this.data_fim;
// //             map["tempo_previsto"] = this.tempo_previsto;
// //             map["gasto_previsto"] = this.gasto_previsto;
// //             return map;
// //         }
// //     }
// // }
// // class ControleFinanceiroObra {
// //     constructor(cronogramaObraId, nome, data_pagamento = null, proximo_vencimento = null, fornecedor = null, nota_fiscal = null, valor = null, forma_pagamento = null, quantidade_parcelas = null) {
// //         this.cronogramaObraId = cronogramaObraId;
// //         this.nome = nome;
// //         this.data_pagamento = data_pagamento;
// //         this.proximo_vencimento = proximo_vencimento;
// //         this.fornecedor = fornecedor;
// //         this.nota_fiscal = nota_fiscal;
// //         this.valor = valor;
// //         this.forma_pagamento = forma_pagamento;
// //         this.quantidade_parcelas = quantidade_parcelas;
// //         this.getTableName = function () {
// //             return 'ControleFinanceiroObra';
// //         };
// //         this.getData_inicio = function () {
// //             return this.data_inicio;
// //         };
// //         this.setData_inicio = function (value) {
// //             this.data_inicio = value;
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["cronogramaObraId"] = this.cronogramaObraId;
// //             map["nome"] = this.nome;
// //             map["data_pagamento"] = this.data_pagamento;
// //             map["proximo_vencimento"] = this.proximo_vencimento;
// //             map["fornecedor"] = this.fornecedor;
// //             map["nota_fiscal"] = this.nota_fiscal;
// //             map["valor"] = this.valor;
// //             map["forma_pagamento"] = this.forma_pagamento;
// //             map["quantidade_parcelas"] = this.quantidade_parcelas;
// //             return map;
// //         }
// //     }
// // }
// // class Tarefa {
// //     constructor(cronogramaObraId, nome_tarefa, responsavel = null, status = null, data_inicio = null, data_fim = null) {
// //         this.cronogramaObraId = cronogramaObraId;
// //         this.nome_tarefa = nome_tarefa;
// //         this.responsavel = responsavel;
// //         this.status = status;
// //         this.data_inicio = data_inicio;
// //         this.data_fim = data_fim;
// //         this.tarefas = [];
// //         this.getTableName = function () {
// //             return 'Tarefa';
// //         };
// //         this.addTarefa = function (value) {
// //             this.tarefas.push(value);
// //         };
// //         this.removeTarefa = function (value) {
// //             var indice = this.clientesID.indexOf(value);
// //             this.clientesID.pud(indice);
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["obraId"] = this.obraId;
// //             map["data_inicio"] = this.data_inicio;
// //             map["data_fim"] = this.data_fim;
// //             map["tempo_previsto"] = this.tempo_previsto;
// //             map["gasto_previsto"] = this.gasto_previsto;
// //             map["tarefas"] = this.tarefas;
// //             return map;
// //         }
// //     }
// // }
// // class StatusTarefa {
// //     constructor(status) {
// //         this.status = status;
// //         this.getTableName = function () {
// //             return 'StatusTarefa';
// //         };
// //         this.getStatus = function () {
// //             return status;
// //         };
// //         this.setStatus = function (value) {
// //             this.status = value;
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["status"] = this.status;
// //             return map;
// //         }
// //     }
// // }
// // class AgendaObra {
// //     constructor(obraId,titulo,data_inicio,data_fim,descricao = null,duracao=null,prioridade=null) {
// //         this.obraId = obraId;
// //         this.titulo = titulo;
// //         this.data_inicio = data_inicio;
// //         this.data_fim = data_fim;
// //         this.descricao = descricao;
// //         this.duracao = duracao;
// //         this.prioridade = prioridade;
// //         this.getTableName = function () {
// //             return 'AgendaObra';
// //         };
// //         this.getTitulo = function () {
// //             return titulo;
// //         };
// //         this.setTitulo = function (value) {
// //             this.titulo = value;
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["obraId"] = this.obraId;
// //             map["titulo"] = this.titulo;
// //             map["data_inicio"] = this.data_inicio;
// //             map["data_fim"] = this.data_fim;
// //             map["descricao"] = this.descricao;
// //             map["duracao"] = this.duracao;
// //             map["prioridade"] = this.prioridade;
// //             return map;
// //         }
// //     }
// // }
// // class AgendaParticular {
// //     constructor(usuarioId,titulo,data_inicio,data_fim,descricao = null,duracao=null,prioridade=null) {
// //         this.usuarioId = usuarioId;
// //         this.titulo = titulo;
// //         this.data_inicio = data_inicio;
// //         this.data_fim = data_fim;
// //         this.descricao = descricao;
// //         this.duracao = duracao;
// //         this.prioridade = prioridade;
// //         this.getTableName = function () {
// //             return 'AgendaParticular';
// //         };
// //         this.getTitulo = function () {
// //             return titulo;
// //         };
// //         this.setTitulo = function (value) {
// //             this.titulo = value;
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["usuarioId"] = this.usuarioId;
// //             map["titulo"] = this.titulo;
// //             map["data_inicio"] = this.data_inicio;
// //             map["data_fim"] = this.data_fim;
// //             map["descricao"] = this.descricao;
// //             map["duracao"] = this.duracao;
// //             map["prioridade"] = this.prioridade;
// //             return map;
// //         }
// //     }
// // }
// // class LembreteParticular {
// //     constructor(usuarioId,titulo,data_inicio,data_fim,descricao = null,duracao=null,) {
// //         this.usuarioId = usuarioId;
// //         this.titulo = titulo;
// //         this.data_inicio = data_inicio;
// //         this.data_fim = data_fim;
// //         this.descricao = descricao;
// //         this.duracao = duracao;
// //         this.getTableName = function () {
// //             return 'LembreteParticular';
// //         };
// //         this.getTitulo = function () {
// //             return titulo;
// //         };
// //         this.setTitulo = function (value) {
// //             this.titulo = value;
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["usuarioId"] = this.usuarioId;
// //             map["titulo"] = this.titulo;
// //             map["data_inicio"] = this.data_inicio;
// //             map["data_fim"] = this.data_fim;
// //             map["descricao"] = this.descricao;
// //             map["duracao"] = this.duracao;
// //             return map;
// //         }
// //     }
// // }
// // class LembreteObra {
// //     constructor(obraId,titulo,data_inicio,data_fim,descricao = null,duracao=null,) {
// //         this.obraId = obraId;
// //         this.titulo = titulo;
// //         this.data_inicio = data_inicio;
// //         this.data_fim = data_fim;
// //         this.descricao = descricao;
// //         this.duracao = duracao;
// //         this.getTableName = function () {
// //             return 'LembreteObra';
// //         };
// //         this.getTitulo = function () {
// //             return titulo;
// //         };
// //         this.setTitulo = function (value) {
// //             this.titulo = value;
// //         };
// //         this.getMap = function () {
// //             var map = new Object();
// //             map["obraId"] = this.obraId;
// //             map["titulo"] = this.titulo;
// //             map["data_inicio"] = this.data_inicio;
// //             map["data_fim"] = this.data_fim;
// //             map["descricao"] = this.descricao;
// //             map["duracao"] = this.duracao;
// //             return map;
// //         }
// //     }
// // }
