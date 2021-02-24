/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listEmpresas = /* GraphQL */ `
  query ListEmpresas(
    $filter: ModelEmpresaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmpresas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nome
        cnpj
        telefone
        email
        usuarioID
        foto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getEmpresa = /* GraphQL */ `
  query GetEmpresa($id: ID!) {
    getEmpresa(id: $id) {
      id
      nome
      cnpj
      telefone
      email
      usuarioID
      foto
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Endereco {
        id
        cep
        bairro
        cidade
        rua
        estado
        pais
        numero
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const syncEmpresas = /* GraphQL */ `
  query SyncEmpresas(
    $filter: ModelEmpresaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEmpresas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        nome
        cnpj
        telefone
        email
        usuarioID
        foto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const listEnderecos = /* GraphQL */ `
  query ListEnderecos(
    $filter: ModelEnderecoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnderecos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cep
        bairro
        cidade
        rua
        estado
        pais
        numero
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getEndereco = /* GraphQL */ `
  query GetEndereco($id: ID!) {
    getEndereco(id: $id) {
      id
      cep
      bairro
      cidade
      rua
      estado
      pais
      numero
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const syncEnderecos = /* GraphQL */ `
  query SyncEnderecos(
    $filter: ModelEnderecoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEnderecos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        cep
        bairro
        cidade
        rua
        estado
        pais
        numero
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const listUsuarios = /* GraphQL */ `
  query ListUsuarios(
    $filter: ModelUsuarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsuarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nome
        email
        telefone
        cpf
        data_nascimento
        data_nascimento_conjuge
        nome_conjuge
        foto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Empresas {
          nextToken
          startedAt
        }
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        TipoUsuario {
          id
          nome
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Obra {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getUsuario = /* GraphQL */ `
  query GetUsuario($id: ID!) {
    getUsuario(id: $id) {
      id
      nome
      email
      telefone
      cpf
      data_nascimento
      data_nascimento_conjuge
      nome_conjuge
      foto
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Empresas {
        items {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Endereco {
        id
        cep
        bairro
        cidade
        rua
        estado
        pais
        numero
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      TipoUsuario {
        id
        nome
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      Obra {
        items {
          id
          nome
          foto
          cor
          usuarioID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const syncUsuarios = /* GraphQL */ `
  query SyncUsuarios(
    $filter: ModelUsuarioFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsuarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        nome
        email
        telefone
        cpf
        data_nascimento
        data_nascimento_conjuge
        nome_conjuge
        foto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Empresas {
          nextToken
          startedAt
        }
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        TipoUsuario {
          id
          nome
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Obra {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const listTipoUsuarios = /* GraphQL */ `
  query ListTipoUsuarios(
    $filter: ModelTipoUsuarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTipoUsuarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nome
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTipoUsuario = /* GraphQL */ `
  query GetTipoUsuario($id: ID!) {
    getTipoUsuario(id: $id) {
      id
      nome
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const syncTipoUsuarios = /* GraphQL */ `
  query SyncTipoUsuarios(
    $filter: ModelTipoUsuarioFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTipoUsuarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        nome
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const listObras = /* GraphQL */ `
  query ListObras(
    $filter: ModelObraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listObras(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nome
        foto
        cor
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Empresa {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Usuarios {
          nextToken
          startedAt
        }
        TipoObra {
          id
          nome
          template
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getObra = /* GraphQL */ `
  query GetObra($id: ID!) {
    getObra(id: $id) {
      id
      nome
      foto
      cor
      usuarioID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Empresa {
        id
        nome
        cnpj
        telefone
        email
        usuarioID
        foto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      Endereco {
        id
        cep
        bairro
        cidade
        rua
        estado
        pais
        numero
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      Usuarios {
        items {
          id
          nome
          email
          telefone
          cpf
          data_nascimento
          data_nascimento_conjuge
          nome_conjuge
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      TipoObra {
        id
        nome
        template
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const syncObras = /* GraphQL */ `
  query SyncObras(
    $filter: ModelObraFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncObras(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        nome
        foto
        cor
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Empresa {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Usuarios {
          nextToken
          startedAt
        }
        TipoObra {
          id
          nome
          template
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const listTipoObras = /* GraphQL */ `
  query ListTipoObras(
    $filter: ModelTipoObraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTipoObras(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nome
        template
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTipoObra = /* GraphQL */ `
  query GetTipoObra($id: ID!) {
    getTipoObra(id: $id) {
      id
      nome
      template
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const syncTipoObras = /* GraphQL */ `
  query SyncTipoObras(
    $filter: ModelTipoObraFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTipoObras(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        nome
        template
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const listCronogramaObras = /* GraphQL */ `
  query ListCronogramaObras(
    $filter: ModelCronogramaObraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCronogramaObras(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        data_inicio
        data_fim
        tempo_previsto
        gasto_previsto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Obra_ {
          id
          nome
          foto
          cor
          usuarioID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getCronogramaObra = /* GraphQL */ `
  query GetCronogramaObra($id: ID!) {
    getCronogramaObra(id: $id) {
      id
      data_inicio
      data_fim
      tempo_previsto
      gasto_previsto
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Obra_ {
        id
        nome
        foto
        cor
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Empresa {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Usuarios {
          nextToken
          startedAt
        }
        TipoObra {
          id
          nome
          template
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const syncCronogramaObras = /* GraphQL */ `
  query SyncCronogramaObras(
    $filter: ModelCronogramaObraFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCronogramaObras(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        data_inicio
        data_fim
        tempo_previsto
        gasto_previsto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Obra_ {
          id
          nome
          foto
          cor
          usuarioID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getControleFinanceiroObra = /* GraphQL */ `
  query GetControleFinanceiroObra($id: ID!) {
    getControleFinanceiroObra(id: $id) {
      id
      nome
      data_pagamento
      proximo_vencimento
      fornecedor
      nota_fiscal
      valor
      forma_pagamento
      quantidade_parcelas
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      CronogramaObra {
        id
        data_inicio
        data_fim
        tempo_previsto
        gasto_previsto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Obra_ {
          id
          nome
          foto
          cor
          usuarioID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listControleFinanceiroObras = /* GraphQL */ `
  query ListControleFinanceiroObras(
    $filter: ModelControleFinanceiroObraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listControleFinanceiroObras(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        nome
        data_pagamento
        proximo_vencimento
        fornecedor
        nota_fiscal
        valor
        forma_pagamento
        quantidade_parcelas
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        CronogramaObra {
          id
          data_inicio
          data_fim
          tempo_previsto
          gasto_previsto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncControleFinanceiroObras = /* GraphQL */ `
  query SyncControleFinanceiroObras(
    $filter: ModelControleFinanceiroObraFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncControleFinanceiroObras(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        nome
        data_pagamento
        proximo_vencimento
        fornecedor
        nota_fiscal
        valor
        forma_pagamento
        quantidade_parcelas
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        CronogramaObra {
          id
          data_inicio
          data_fim
          tempo_previsto
          gasto_previsto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const listTarefas = /* GraphQL */ `
  query ListTarefas(
    $filter: ModelTarefaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTarefas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nome_tarefa
        data_inicio
        data_fim
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Responsavel {
          id
          nome
          email
          telefone
          cpf
          data_nascimento
          data_nascimento_conjuge
          nome_conjuge
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        CronogramaObra {
          id
          data_inicio
          data_fim
          tempo_previsto
          gasto_previsto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        TarefaOrigem {
          id
          nome_tarefa
          data_inicio
          data_fim
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        status {
          id
          status
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getTarefa = /* GraphQL */ `
  query GetTarefa($id: ID!) {
    getTarefa(id: $id) {
      id
      nome_tarefa
      data_inicio
      data_fim
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Responsavel {
        id
        nome
        email
        telefone
        cpf
        data_nascimento
        data_nascimento_conjuge
        nome_conjuge
        foto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Empresas {
          nextToken
          startedAt
        }
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        TipoUsuario {
          id
          nome
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Obra {
          nextToken
          startedAt
        }
      }
      CronogramaObra {
        id
        data_inicio
        data_fim
        tempo_previsto
        gasto_previsto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Obra_ {
          id
          nome
          foto
          cor
          usuarioID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      TarefaOrigem {
        id
        nome_tarefa
        data_inicio
        data_fim
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Responsavel {
          id
          nome
          email
          telefone
          cpf
          data_nascimento
          data_nascimento_conjuge
          nome_conjuge
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        CronogramaObra {
          id
          data_inicio
          data_fim
          tempo_previsto
          gasto_previsto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        TarefaOrigem {
          id
          nome_tarefa
          data_inicio
          data_fim
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        status {
          id
          status
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      status {
        id
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const syncTarefas = /* GraphQL */ `
  query SyncTarefas(
    $filter: ModelTarefaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTarefas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        nome_tarefa
        data_inicio
        data_fim
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Responsavel {
          id
          nome
          email
          telefone
          cpf
          data_nascimento
          data_nascimento_conjuge
          nome_conjuge
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        CronogramaObra {
          id
          data_inicio
          data_fim
          tempo_previsto
          gasto_previsto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        TarefaOrigem {
          id
          nome_tarefa
          data_inicio
          data_fim
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        status {
          id
          status
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const listStatusTarefas = /* GraphQL */ `
  query ListStatusTarefas(
    $filter: ModelStatusTarefaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStatusTarefas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getStatusTarefa = /* GraphQL */ `
  query GetStatusTarefa($id: ID!) {
    getStatusTarefa(id: $id) {
      id
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const syncStatusTarefas = /* GraphQL */ `
  query SyncStatusTarefas(
    $filter: ModelStatusTarefaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStatusTarefas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAgendaObra = /* GraphQL */ `
  query GetAgendaObra($id: ID!) {
    getAgendaObra(id: $id) {
      id
      titulo
      descricao
      data_inicio
      data_fim
      duracao
      prioridade
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Obra {
        id
        nome
        foto
        cor
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Empresa {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Usuarios {
          nextToken
          startedAt
        }
        TipoObra {
          id
          nome
          template
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listAgendaObras = /* GraphQL */ `
  query ListAgendaObras(
    $filter: ModelAgendaObraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgendaObras(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        prioridade
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Obra {
          id
          nome
          foto
          cor
          usuarioID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAgendaObras = /* GraphQL */ `
  query SyncAgendaObras(
    $filter: ModelAgendaObraFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAgendaObras(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        prioridade
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Obra {
          id
          nome
          foto
          cor
          usuarioID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getAgendaParticular = /* GraphQL */ `
  query GetAgendaParticular($id: ID!) {
    getAgendaParticular(id: $id) {
      id
      titulo
      descricao
      data_inicio
      data_fim
      duracao
      prioridade
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Usuario {
        id
        nome
        email
        telefone
        cpf
        data_nascimento
        data_nascimento_conjuge
        nome_conjuge
        foto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Empresas {
          nextToken
          startedAt
        }
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        TipoUsuario {
          id
          nome
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Obra {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const listAgendaParticulars = /* GraphQL */ `
  query ListAgendaParticulars(
    $filter: ModelAgendaParticularFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgendaParticulars(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        prioridade
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Usuario {
          id
          nome
          email
          telefone
          cpf
          data_nascimento
          data_nascimento_conjuge
          nome_conjuge
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAgendaParticulars = /* GraphQL */ `
  query SyncAgendaParticulars(
    $filter: ModelAgendaParticularFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAgendaParticulars(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        prioridade
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Usuario {
          id
          nome
          email
          telefone
          cpf
          data_nascimento
          data_nascimento_conjuge
          nome_conjuge
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getLembreteParticular = /* GraphQL */ `
  query GetLembreteParticular($id: ID!) {
    getLembreteParticular(id: $id) {
      id
      titulo
      descricao
      data_inicio
      data_fim
      duracao
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Usuario {
        id
        nome
        email
        telefone
        cpf
        data_nascimento
        data_nascimento_conjuge
        nome_conjuge
        foto
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Empresas {
          nextToken
          startedAt
        }
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        TipoUsuario {
          id
          nome
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Obra {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const listLembreteParticulars = /* GraphQL */ `
  query ListLembreteParticulars(
    $filter: ModelLembreteParticularFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLembreteParticulars(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Usuario {
          id
          nome
          email
          telefone
          cpf
          data_nascimento
          data_nascimento_conjuge
          nome_conjuge
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLembreteParticulars = /* GraphQL */ `
  query SyncLembreteParticulars(
    $filter: ModelLembreteParticularFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLembreteParticulars(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Usuario {
          id
          nome
          email
          telefone
          cpf
          data_nascimento
          data_nascimento_conjuge
          nome_conjuge
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getLembreteObra = /* GraphQL */ `
  query GetLembreteObra($id: ID!) {
    getLembreteObra(id: $id) {
      id
      titulo
      descricao
      data_inicio
      data_fim
      duracao
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Obra {
        id
        nome
        foto
        cor
        usuarioID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Empresa {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        Usuarios {
          nextToken
          startedAt
        }
        TipoObra {
          id
          nome
          template
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listLembreteObras = /* GraphQL */ `
  query ListLembreteObras(
    $filter: ModelLembreteObraFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLembreteObras(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Obra {
          id
          nome
          foto
          cor
          usuarioID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLembreteObras = /* GraphQL */ `
  query SyncLembreteObras(
    $filter: ModelLembreteObraFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLembreteObras(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Obra {
          id
          nome
          foto
          cor
          usuarioID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
