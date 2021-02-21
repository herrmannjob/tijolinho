import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Empresa {
  readonly id: string;
  readonly nome: string;
  readonly cnpj?: string;
  readonly telefone?: string;
  readonly email?: string;
  readonly usuarioID?: string[];
  readonly foto?: string;
  readonly Endereco: Endereco;
  constructor(init: ModelInit<Empresa>);
  static copyOf(source: Empresa, mutator: (draft: MutableModel<Empresa>) => MutableModel<Empresa> | void): Empresa;
}

export declare class Endereco {
  readonly id: string;
  readonly cep?: string;
  readonly bairro?: string;
  readonly cidade?: string;
  readonly rua?: string;
  readonly estado?: string;
  readonly pais?: string;
  readonly numero?: string;
  constructor(init: ModelInit<Endereco>);
  static copyOf(source: Endereco, mutator: (draft: MutableModel<Endereco>) => MutableModel<Endereco> | void): Endereco;
}

export declare class Usuario {
  readonly id: string;
  readonly nome: string;
  readonly email?: string;
  readonly telefone?: string;
  readonly cpf?: string;
  readonly data_nascimento?: string;
  readonly data_nascimento_conjuge?: string;
  readonly nome_conjuge?: string;
  readonly foto?: string;
  readonly Endereco?: Endereco;
  readonly TipoUsuario: TipoUsuario;
  readonly Obra?: (Obra | null)[];
  readonly obraUsuariosId?: string;
  constructor(init: ModelInit<Usuario>);
  static copyOf(source: Usuario, mutator: (draft: MutableModel<Usuario>) => MutableModel<Usuario> | void): Usuario;
}

export declare class TipoUsuario {
  readonly id: string;
  readonly nome: string;
  constructor(init: ModelInit<TipoUsuario>);
  static copyOf(source: TipoUsuario, mutator: (draft: MutableModel<TipoUsuario>) => MutableModel<TipoUsuario> | void): TipoUsuario;
}

export declare class Obra {
  readonly id: string;
  readonly nome: string;
  readonly foto?: (string | null)[];
  readonly cor?: string;
  readonly Endereco: Endereco;
  readonly TipoObra: TipoObra;
  readonly Empresa: Empresa;
  readonly usuarioID?: string;
  readonly Usuarios?: (Usuario | null)[];
  constructor(init: ModelInit<Obra>);
  static copyOf(source: Obra, mutator: (draft: MutableModel<Obra>) => MutableModel<Obra> | void): Obra;
}

export declare class TipoObra {
  readonly id: string;
  readonly nome: string;
  readonly template?: string;
  constructor(init: ModelInit<TipoObra>);
  static copyOf(source: TipoObra, mutator: (draft: MutableModel<TipoObra>) => MutableModel<TipoObra> | void): TipoObra;
}

export declare class CronogramaObra {
  readonly id: string;
  readonly Obra_: Obra;
  readonly data_inicio: string;
  readonly data_fim: string;
  readonly tempo_previsto?: string;
  readonly gasto_previsto?: string;
  constructor(init: ModelInit<CronogramaObra>);
  static copyOf(source: CronogramaObra, mutator: (draft: MutableModel<CronogramaObra>) => MutableModel<CronogramaObra> | void): CronogramaObra;
}

export declare class ControleFinanceiroObra {
  readonly id: string;
  readonly CronogramaObra: CronogramaObra;
  readonly nome: string;
  readonly data_pagamento?: string;
  readonly proximo_vencimento?: string;
  readonly fornecedor?: string;
  readonly nota_fiscal?: string;
  readonly valor?: string;
  readonly forma_pagamento?: string;
  readonly quantidade_parcelas?: string;
  constructor(init: ModelInit<ControleFinanceiroObra>);
  static copyOf(source: ControleFinanceiroObra, mutator: (draft: MutableModel<ControleFinanceiroObra>) => MutableModel<ControleFinanceiroObra> | void): ControleFinanceiroObra;
}

export declare class Tarefa {
  readonly id: string;
  readonly CronogramaObra: CronogramaObra;
  readonly Responsavel?: Usuario;
  readonly status?: StatusTarefa;
  readonly nome_tarefa: string;
  readonly data_inicio?: string;
  readonly data_fim?: string;
  readonly TarefaOrigem?: Tarefa;
  constructor(init: ModelInit<Tarefa>);
  static copyOf(source: Tarefa, mutator: (draft: MutableModel<Tarefa>) => MutableModel<Tarefa> | void): Tarefa;
}

export declare class StatusTarefa {
  readonly id: string;
  readonly status: string;
  constructor(init: ModelInit<StatusTarefa>);
  static copyOf(source: StatusTarefa, mutator: (draft: MutableModel<StatusTarefa>) => MutableModel<StatusTarefa> | void): StatusTarefa;
}

export declare class AgendaObra {
  readonly id: string;
  readonly Obra: Obra;
  readonly titulo: string;
  readonly descricao?: string;
  readonly data_inicio: string;
  readonly data_fim: string;
  readonly duracao?: string;
  readonly prioridade?: string;
  constructor(init: ModelInit<AgendaObra>);
  static copyOf(source: AgendaObra, mutator: (draft: MutableModel<AgendaObra>) => MutableModel<AgendaObra> | void): AgendaObra;
}

export declare class AgendaParticular {
  readonly id: string;
  readonly Usuario: Usuario;
  readonly titulo: string;
  readonly descricao?: string;
  readonly data_inicio: string;
  readonly data_fim: string;
  readonly duracao?: string;
  readonly prioridade?: string;
  constructor(init: ModelInit<AgendaParticular>);
  static copyOf(source: AgendaParticular, mutator: (draft: MutableModel<AgendaParticular>) => MutableModel<AgendaParticular> | void): AgendaParticular;
}

export declare class LembreteParticular {
  readonly id: string;
  readonly Usuario: Usuario;
  readonly titulo: string;
  readonly descricao?: string;
  readonly data_inicio: string;
  readonly data_fim: string;
  readonly duracao?: string;
  constructor(init: ModelInit<LembreteParticular>);
  static copyOf(source: LembreteParticular, mutator: (draft: MutableModel<LembreteParticular>) => MutableModel<LembreteParticular> | void): LembreteParticular;
}

export declare class LembreteObra {
  readonly id: string;
  readonly Obra: Obra;
  readonly titulo: string;
  readonly descricao?: string;
  readonly data_inicio?: string;
  readonly data_fim?: string;
  readonly duracao?: string;
  constructor(init: ModelInit<LembreteObra>);
  static copyOf(source: LembreteObra, mutator: (draft: MutableModel<LembreteObra>) => MutableModel<LembreteObra> | void): LembreteObra;
}