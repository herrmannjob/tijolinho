import * as firebase from '@/services/Firebase'
const db = firebase.firestore();
// const userId = firebase.auth().currentUser.uid;
async function setData(campo, title) {
    const data = await db.collection(campo.getTableName()).doc(title).set(campo.getMap())
        .then(() => {
            location.reload()
        })
        .catch(error => {
            console.error(error);
        });
    return data;
}
class Empresa {
    constructor(nome, id_endereco, usuarioId = null, cnpj = null, telefone = null, email = null, foto = null, raio_entrega = null, valor_min = null) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.telefone = telefone;
        this.email = email;
        this.foto = foto;
        this.id_endereco = id_endereco;
        this.raio_entrega = raio_entrega;
        this.valor_min = valor_min;
        var usuariosIDs = [];
        var tiposMaterial = [];
        if (usuarioId != null)
            usuariosIDs.push(usuarioId);

        this.addUsuariosIDs = function (value) {
            usuariosIDs.push(value);
        };
        this.removeUsuariosIDs = function (value) {
            var indice = usuariosIDs.indexOf(value);
            usuariosIDs.pud(indice);
        };
        this.addTiposMaterial = function (value) {
            tiposMaterial.push(value);
        };
        this.removeTiposMaterial = function (value) {
            var indice = tiposMaterial.indexOf(value);
            tiposMaterial.pud(indice);
        };
        this.getNome = function () {
            return nome;
        };
        this.setNome = function (value) {
            this.nome = value;
        };
        this.getTableName = function () {
            return 'Empresa';
        };
        this.getMap = function () {
            var map = new Object();
            map["nome"] = this.nome;
            map["cnpj"] = this.cnpj;
            map["telefone"] = this.telefone;
            map["email"] = this.email;
            map["foto"] = this.foto;
            map["id_endereco"] = this.id_endereco;
            map["usuariosIDs"] = usuariosIDs;
            map["raio_entrega"] = this.raio_entrega;
            map["valor_min"] = this.valor_min;
            map["tiposMaterial"] = tiposMaterial;
            return map;
        }
    }
}
class Endereco {
    constructor(cep, bairro = null, cidade = null, rua = null, estado = null, pais = null, numero = null) {
        this.cep = cep;
        this.bairro = bairro;
        this.cidade = cidade;
        this.rua = rua;
        this.estado = estado;
        this.pais = pais;
        this.numero = numero;
        this.getTableName = function () {
            return 'Endereco';
        };
        this.getMap = function () {
            var map = new Object();
            map["cep"] = this.cep;
            map["bairro"] = this.bairro;
            map["cidade"] = this.cidade;
            map["rua"] = this.rua;
            map["estado"] = this.estado;
            map["pais"] = this.pais;
            map["numero"] = this.numero;
            return map;
        }
    }
}
class Usuario {
    constructor(nome, tipoUsuario, empresaId = null, obraId = null, email = null, telefone = null, cpf = null, data_nascimento = null, data_nascimento_conjuge = null, nome_conjuge = null, foto = null, endereco = null, avaliacao = null) {
        this.nome = nome;
        this.tipoUsuario = tipoUsuario;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.data_nascimento_conjuge = data_nascimento_conjuge;
        this.nome_conjuge = nome_conjuge;
        this.foto = foto;
        this.endereco = endereco;
        this.avaliacao = avaliacao;
        var empresas = [];
        var obra = [];
        var cotacao = [];
        if (empresaId != null)
            empresas.push(empresaId);
        if (obraId != null)
            obra.push(obraId);
        this.getTableName = function () {
            return 'Usuario';
        };
        this.addEmpresas = function (value) {
            empresas.push(value);
        };
        this.removeEmpresas = function (value) {
            var indice = empresas.indexOf(value);
            empresas.pud(indice);
        };
        this.addObra = function (value) {
            empresas.push(value);
        };
        this.removeObra = function (value) {
            var indice = obra.indexOf(value);
            obra.pud(indice);
        };
        this.addCotacao = function (value) {
            cotacao.push(value);
        };
        this.removeCotacao = function (value) {
            var indice = cotacao.indexOf(value);
            cotacao.pud(indice);
        };
        this.getMap = function () {
            var map = new Object();
            map["nome"] = this.nome;
            map["tipoUsuario"] = this.tipoUsuario;
            map["email"] = this.email;
            map["telefone"] = this.telefone;
            map["cpf"] = this.cpf;
            map["data_nascimento"] = this.data_nascimento;
            map["data_nascimento_conjuge"] = this.data_nascimento_conjuge;
            map["nome_conjuge"] = this.nome_conjuge;
            map["foto"] = this.foto;
            map["endereco"] = this.endereco;
            map["empresas"] = empresas;
            map["obra"] = obra;
            map["avaliacao"] = this.avaliacao;//só para fornecedor
            map["cotacao"] = cotacao;//só para fornecedor
            return map;
        }
    }
}
class tipoUsuario {
    constructor(nome) {
        this.nome = nome;
        this.getNome = function () {
            return nome;
        };
        this.getTableName = function () {
            return 'tipoUsuario';
        };
        this.setNome = function (value) {
            this.nome = value;
        };
        this.getMap = function () {
            var map = new Object();
            map["nome"] = this.nome;
            return map;
        }
    }
}
class tipoObra {
    constructor(nome, template = null) {
        this.nome = nome;
        this.template = template;
        this.getTableName = function () {
            return 'tipoObra';
        };
        this.getNome = function () {
            return nome;
        };
        this.setNome = function (value) {
            this.nome = value;
        };
        this.getTemplate = function () {
            return template;
        };
        this.setTemplate = function (value) {
            this.template = value;
        };
        this.getMap = function () {
            var map = new Object();
            map["nome"] = this.nome;
            map["template"] = this.template;
            return map;
        }
    }
}
class Obra {
    constructor(nome, Endereco, TipoObra, Empresa, clienteID = null, arquitetoId = null, cor = null) {
        this.nome = nome;
        this.Endereco = Endereco;
        this.TipoObra = TipoObra;
        this.Empresa = Empresa;
        this.cor = cor;
        var id_arquitetos = [];
        var id_clientes = [];
        var ids_cotacoes = [];
        if (arquitetoId != null)
            id_arquitetos.push(arquitetoId);
        if (clienteID != null)
            id_clientes.push(clienteID);
        this.getTableName = function () {
            return 'Obra';
        };
        this.getCor = function () {
            return cor;
        };
        this.setCor = function (value) {
            this.cor = cor;
        };
        this.addArquiteto = function (value) {
            id_arquitetos.push(value);
        };
        this.removeArquiteto = function (value) {
            var indice = id_arquitetos.indexOf(value);
            id_arquitetos.pud(indice);
        };
        this.addCliente = function (value) {
            id_clientes.push(value);
        };
        this.removeCliente = function (value) {
            var indice = id_clientes.indexOf(value);
            id_clientes.pud(indice);
        };
        this.addCotacao = function (value) {
            ids_cotacoes.push(value);
        };
        this.removeCotacao = function (value) {
            var indice = ids_cotacoes.indexOf(value);
            ids_cotacoes.pud(indice);
        };
        this.getMap = function () {
            var map = new Object();
            map["nome"] = this.nome;
            map["Endereco"] = this.Endereco;
            map["TipoObra"] = this.TipoObra;
            map["Empresa"] = this.Empresa;
            map["cor"] = this.cor;
            map["idArquitetos"] = id_arquitetos;
            map["idClientes"] = id_clientes;
            map["idCotacao"] = ids_cotacoes;
            return map;
        }
    }
}
class CronogramaObra {
    constructor(obraId, data_inicio, data_fim, tempo_previsto = null, gasto_previsto = null) {
        obraId = obraId;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.tempo_previsto = tempo_previsto;
        this.gasto_previsto = gasto_previsto;
        this.getTableName = function () {
            return 'CronogramaObra';
        };
        this.getData_inicio = function () {
            return this.data_inicio;
        };
        this.setData_inicio = function (value) {
            this.data_inicio = value;
        };
        this.getMap = function () {
            var map = new Object();
            map["obraId"] = obraId;
            map["data_inicio"] = this.data_inicio;
            map["data_fim"] = this.data_fim;
            map["tempo_previsto"] = this.tempo_previsto;
            map["gasto_previsto"] = this.gasto_previsto;
            return map;
        }
    }
}
class ControleFinanceiroObra {
    constructor(cronogramaObraId, nome, data_pagamento = null, proximo_vencimento = null, fornecedor = null, nota_fiscal = null, valor = null, forma_pagamento = null, quantidade_parcelas = null) {
        this.cronogramaObraId = cronogramaObraId;
        this.nome = nome;
        this.data_pagamento = data_pagamento;
        this.proximo_vencimento = proximo_vencimento;
        this.fornecedor = fornecedor;
        this.nota_fiscal = nota_fiscal;
        this.valor = valor;
        this.forma_pagamento = forma_pagamento;
        this.quantidade_parcelas = quantidade_parcelas;
        this.getTableName = function () {
            return 'ControleFinanceiroObra';
        };
        this.getData_inicio = function () {
            return this.data_inicio;
        };
        this.setData_inicio = function (value) {
            this.data_inicio = value;
        };
        this.getMap = function () {
            var map = new Object();
            map["cronogramaObraId"] = this.cronogramaObraId;
            map["nome"] = this.nome;
            map["data_pagamento"] = this.data_pagamento;
            map["proximo_vencimento"] = this.proximo_vencimento;
            map["fornecedor"] = this.fornecedor;
            map["nota_fiscal"] = this.nota_fiscal;
            map["valor"] = this.valor;
            map["forma_pagamento"] = this.forma_pagamento;
            map["quantidade_parcelas"] = this.quantidade_parcelas;
            return map;
        }
    }
}
class Tarefa {
    constructor(cronogramaObraId, nome_tarefa, responsavel = null, status = null, data_inicio = null, data_fim = null) {
        this.cronogramaObraId = cronogramaObraId;
        this.nome_tarefa = nome_tarefa;
        this.responsavel = responsavel;
        this.status = status;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        var tarefas = [];
        this.getTableName = function () {
            return 'Tarefa';
        };
        this.addTarefa = function (value) {
            tarefas.push(value);
        };
        this.removeTarefa = function (value) {
            var indice = tarefas.indexOf(value);
            tarefas.pud(indice);
        };
        this.getMap = function () {
            var map = new Object();
            map["obraId"] = obraId;
            map["data_inicio"] = this.data_inicio;
            map["data_fim"] = this.data_fim;
            map["tempo_previsto"] = this.tempo_previsto;
            map["gasto_previsto"] = this.gasto_previsto;
            map["tarefas"] = tarefas;
            return map;
        }
    }
}
class StatusTarefa {
    constructor(status) {
        this.status = status;
        this.getTableName = function () {
            return 'StatusTarefa';
        };
        this.getStatus = function () {
            return status;
        };
        this.setStatus = function (value) {
            this.status = value;
        };
        this.getMap = function () {
            var map = new Object();
            map["status"] = this.status;
            return map;
        }
    }
}
class AgendaObra {
    constructor(obraId, titulo, data_inicio, data_fim, descricao = null, duracao = null, prioridade = null) {
        obraId = obraId;
        this.titulo = titulo;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.descricao = descricao;
        this.duracao = duracao;
        this.prioridade = prioridade;
        this.getTableName = function () {
            return 'AgendaObra';
        };
        this.getTitulo = function () {
            return titulo;
        };
        this.setTitulo = function (value) {
            this.titulo = value;
        };
        this.getMap = function () {
            var map = new Object();
            map["obraId"] = obraId;
            map["titulo"] = this.titulo;
            map["data_inicio"] = this.data_inicio;
            map["data_fim"] = this.data_fim;
            map["descricao"] = this.descricao;
            map["duracao"] = this.duracao;
            map["prioridade"] = this.prioridade;
            return map;
        }
    }
}
class AgendaParticular {
    constructor(usuarioId, titulo, data_inicio, data_fim, descricao = null, duracao = null, prioridade = null) {
        this.usuarioId = usuarioId;
        this.titulo = titulo;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.descricao = descricao;
        this.duracao = duracao;
        this.prioridade = prioridade;
        this.getTableName = function () {
            return 'AgendaParticular';
        };
        this.getTitulo = function () {
            return titulo;
        };
        this.setTitulo = function (value) {
            this.titulo = value;
        };
        this.getMap = function () {
            var map = new Object();
            map["usuarioId"] = this.usuarioId;
            map["titulo"] = this.titulo;
            map["data_inicio"] = this.data_inicio;
            map["data_fim"] = this.data_fim;
            map["descricao"] = this.descricao;
            map["duracao"] = this.duracao;
            map["prioridade"] = this.prioridade;
            return map;
        }
    }
}
class LembreteParticular {
    constructor(usuarioId, titulo, data_inicio, data_fim, descricao = null, duracao = null,) {
        this.usuarioId = usuarioId;
        this.titulo = titulo;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.descricao = descricao;
        this.duracao = duracao;
        this.getTableName = function () {
            return 'LembreteParticular';
        };
        this.getTitulo = function () {
            return titulo;
        };
        this.setTitulo = function (value) {
            this.titulo = value;
        };
        this.getMap = function () {
            var map = new Object();
            map["usuarioId"] = this.usuarioId;
            map["titulo"] = this.titulo;
            map["data_inicio"] = this.data_inicio;
            map["data_fim"] = this.data_fim;
            map["descricao"] = this.descricao;
            map["duracao"] = this.duracao;
            return map;
        }
    }
}
class LembreteObra {
    constructor(obraId, titulo, data_inicio, data_fim, descricao = null, duracao = null,) {
        obraId = obraId;
        this.titulo = titulo;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.descricao = descricao;
        this.duracao = duracao;
        this.getTableName = function () {
            return 'LembreteObra';
        };
        this.getTitulo = function () {
            return titulo;
        };
        this.setTitulo = function (value) {
            this.titulo = value;
        };
        this.getMap = function () {
            var map = new Object();
            map["obraId"] = obraId;
            map["titulo"] = this.titulo;
            map["data_inicio"] = this.data_inicio;
            map["data_fim"] = this.data_fim;
            map["descricao"] = this.descricao;
            map["duracao"] = this.duracao;
            return map;
        }
    }
}
class TipoMaterial {
    constructor(nome) {//ex: material bruto, material de acabamento e decoração
        this.nome = nome;
        this.getTableName = function () {
            return 'TipoMaterial';
        };
        this.getMap = function () {
            var map = new Object();
            map["nome"] = this.nome;
            return map;
        }
    }
}
class TipoCotacao {
    constructor(status) {
        this.status = status;
        this.getTableName = function () {
            return 'TipoCotacao';
        };
        this.getMap = function () {
            var map = new Object();
            map["status"] = this.status;
            return map;
        }
    }
}
class Cotacao {
    constructor(titulo, idObra, idTipoCotacao, prazo = null, dataDeEntrega = null, idEtapa, anexo = null) {
        this.titulo = titulo;
        this.idObra = idObra;
        this.prazo = prazo;
        this.idTipoCotacao = idTipoCotacao;
        var data_entrega = new Date(Date.now());
        this.dataDeEntrega = dataDeEntrega;
        this.idEtapa = idEtapa;
        this.anexo = anexo;
        var id_materiais = [];
        var id_fornecedores = [];
        this.getTableName = function () {
            return 'Cotacao';
        };
        this.getTitulo = function () {
            return titulo;
        };
        this.setTitulo = function (value) {
            this.titulo = value;
        };
        this.addMaterial = function (value) {
            id_materiais.push(value);
        };
        this.removeMateriais = function (value) {
            var indice = tarefas.indexOf(value);
            id_materiais.pud(indice);
        };
        this.addFornecedores = function (value) {
            id_fornecedores.push(value);
        };
        this.removeFornecedores = function (value) {
            var indice = tarefas.indexOf(value);
            id_fornecedores.pud(indice);
        };
        this.getMap = function () {
            var map = new Object();
            map["titulo"] = this.titulo;
            map["idTipoCotacao"] = this.idTipoCotacao;
            map["data_entrega"] = data_entrega;
            map["prazo"] = this.prazo;
            map["idEtapa"] = this.idEtapa;
            map["anexo"] = this.anexo;
            map["idpedidoMaterial"] = pedidoMaterial;
            map["idFornecedor"] = id_fornecedor;//usuario
            return map;
        }
    }
}
class Material {
    constructor(nome,id_tipo_medida = null,tipoMaterial = null) {
        this.nome = nome;
        this.id_tipo_medida = id_tipo_medida;
        this.tipoMaterial = tipoMaterial;
        var id_especificacoes = [];
        this.getTableName = function () {
            return 'Material';
        };
        this.addEspecificacoes = function (value) {
            id_especificacoes.push(value);
        };
        this.removeEspecificacoes = function (value) {
            var indice = id_especificacoes.indexOf(value);
            id_especificacoes.pud(indice);
        };
        this.getMap = function () {
            var map = new Object();
            map["nome"] = this.nome;
            map["id_tipo_medida"] = this.id_tipo_medida;
            map["tipoMaterial"] = this.tipoMaterial;
            map["id_especificacoes"] = id_especificacoes;
            return map;
        }
    }
}
class PedidoMaterial {
    constructor(idMaterial, qtd = null, outras_especificacoes = null,preco=null) {
        this.idMaterial = idMaterial;
        this.qtd = qtd;
        this.outras_especificacoes = outras_especificacoes;
        this.preco = preco;
        this.getTableName = function () {
            return 'PedidoMaterial';
        };
        this.getMap = function () {
            var map = new Object();
            map["idMaterial"] = this.idMaterial;
            map["qtd"] = this.qtd;
            map["outras_especificacoes"] = this.outras_especificacoes;
            map["preco"] = this.preco;
            return map;
        }
    }
}
class TipoMedida {
    constructor(nome, unidade_de_medida) {
        this.nome = nome;
        this.unidade_de_medida = unidade_de_medida;
        this.getTableName = function () {
            return 'TipoMedida';
        };
        this.getMap = function () {
            var map = new Object();
            map["nome"] = this.nome;
            map["unidade_de_medida"] = this.unidade_de_medida;
            return map;
        }
    }
}
class Especificacao_material {//cor{amarelo,azul}
    constructor(nome) {
        this.nome = nome;
        var campos = [];
        this.getTableName = function () {
            return 'Especificacao_material';
        };
        this.addEspecificacoes = function (value) {
            campos.push(value);
        };
        this.removeEspecificacoes = function (value) {
            var indice = campos.indexOf(value);
            campos.pud(indice);
        };
        this.getMap = function () {
            var map = new Object();
            map["nome"] = this.nome;
            map["campos"] = campos;
            return map;
        }
    }
}
class CotacaoResposta {
    constructor(titulo, idObra, idTipoCotacao, prazo = null, dataDeEntrega = null, anexo = null, frete = null, desconto = null, preco_total = null) {
        this.titulo = titulo;
        this.idObra = idObra;
        this.prazo = prazo;
        this.idTipoCotacao = idTipoCotacao;
        var data_entrega = new Date(Date.now());
        this.dataDeEntrega = dataDeEntrega;
        this.anexo = anexo;
        this.frete = frete;
        this.desconto = desconto;
        this.preco_total = preco_total;
        var id_materiais = [];  //nova lista de materiais passando o preço
        var id_fornecedores = [];   //id do usuario
        this.getTableName = function () {
            return 'CotacaoResposta';
        };
        this.getTitulo = function () {
            return titulo;
        };
        this.setTitulo = function (value) {
            this.titulo = value;
        };
        this.addMaterial = function (value) {
            id_materiais.push(value);
        };
        this.removeMateriais = function (value) {
            var indice = tarefas.indexOf(value);
            id_materiais.pud(indice);
        };
        this.addFornecedores = function (value) {
            id_fornecedores.push(value);
        };
        this.removeFornecedores = function (value) {
            var indice = tarefas.indexOf(value);
            id_fornecedores.pud(indice);
        };
        this.getMap = function () {
            var map = new Object();
            map["titulo"] = this.titulo;
            map["idObra"] = this.idObra;
            map["idTipoCotacao"] = this.idTipoCotacao;
            map["data_entrega"] = data_entrega;
            map["prazo"] = this.prazo;
            map["anexo"] = this.anexo;
            map["idMateriais"] = id_materiais;
            map["idFornecedor"] = id_fornecedores;//usuario
            return map;
        }
    }
}
class StatusCotacao {
    constructor(nome, observacoes) {//são 3 status. só terá motivos e observações no status cancelado
        this.nome = nome;
        this.observacoes = observacoes;
        var motivos = [];//serão sempre 3
        this.getTableName = function () {
            return 'StatusCotacao';
        };
        this.addMotivos = function (value) {
            motivos.push(value);
        };
        this.removeMotivos = function (value) {
            var indice = motivos.indexOf(value);
            motivos.pud(indice);
        };
        this.getMap = function () {
            var map = new Object();
            map["nome"] = this.nome;
            map["observacoes"] = this.observacoes;
            map["motivos"] = motivos;
            return map;
        }
    }
}
//falta a tabela de vendas
export default {Empresa,Usuario,tipoObra,tipoUsuario,Endereco,setData}