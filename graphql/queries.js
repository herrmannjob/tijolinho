/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      Endereco {
        id
        cep
        bairro
        cidade
        rua
        estado
        pais
        numero
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
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
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
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
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      nextToken
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
      Empresas {
        items {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          createdAt
          updatedAt
        }
        nextToken
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
        createdAt
        updatedAt
      }
      TipoUsuario {
        id
        nome
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        Empresas {
          nextToken
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
          createdAt
          updatedAt
        }
        TipoUsuario {
          id
          nome
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTipoUsuario = /* GraphQL */ `
  query GetTipoUsuario($id: ID!) {
    getTipoUsuario(id: $id) {
      id
      nome
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getObra = /* GraphQL */ `
  query GetObra($id: ID!) {
    getObra(id: $id) {
      id
      nome
      foto
      Endereco {
        id
        cep
        bairro
        cidade
        rua
        estado
        pais
        numero
        createdAt
        updatedAt
      }
      TipoObra {
        id
        nome
        template
        createdAt
        updatedAt
      }
      Empresa {
        id
        nome
        cnpj
        telefone
        email
        usuarioID
        foto
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          createdAt
          updatedAt
        }
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
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          createdAt
          updatedAt
        }
        TipoObra {
          id
          nome
          template
          createdAt
          updatedAt
        }
        Empresa {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          createdAt
          updatedAt
        }
        Usuarios {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTipoObra = /* GraphQL */ `
  query GetTipoObra($id: ID!) {
    getTipoObra(id: $id) {
      id
      nome
      template
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCronogramaObra = /* GraphQL */ `
  query GetCronogramaObra($id: ID!) {
    getCronogramaObra(id: $id) {
      id
      Obra_ {
        id
        nome
        foto
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          createdAt
          updatedAt
        }
        TipoObra {
          id
          nome
          template
          createdAt
          updatedAt
        }
        Empresa {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          createdAt
          updatedAt
        }
        Usuarios {
          nextToken
        }
        createdAt
        updatedAt
      }
      data_inicio
      data_fim
      tempo_previsto
      gasto_previsto
      createdAt
      updatedAt
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
        Obra_ {
          id
          nome
          foto
          createdAt
          updatedAt
        }
        data_inicio
        data_fim
        tempo_previsto
        gasto_previsto
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getControleFinanceiroObra = /* GraphQL */ `
  query GetControleFinanceiroObra($id: ID!) {
    getControleFinanceiroObra(id: $id) {
      id
      CronogramaObra {
        id
        Obra_ {
          id
          nome
          foto
          createdAt
          updatedAt
        }
        data_inicio
        data_fim
        tempo_previsto
        gasto_previsto
        createdAt
        updatedAt
      }
      nome
      data_pagamento
      proximo_vencimento
      fornecedor
      nota_fiscal
      valor
      forma_pagamento
      quantidade_parcelas
      createdAt
      updatedAt
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
        CronogramaObra {
          id
          data_inicio
          data_fim
          tempo_previsto
          gasto_previsto
          createdAt
          updatedAt
        }
        nome
        data_pagamento
        proximo_vencimento
        fornecedor
        nota_fiscal
        valor
        forma_pagamento
        quantidade_parcelas
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTarefa = /* GraphQL */ `
  query GetTarefa($id: ID!) {
    getTarefa(id: $id) {
      id
      CronogramaObra {
        id
        Obra_ {
          id
          nome
          foto
          createdAt
          updatedAt
        }
        data_inicio
        data_fim
        tempo_previsto
        gasto_previsto
        createdAt
        updatedAt
      }
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
        Empresas {
          nextToken
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
          createdAt
          updatedAt
        }
        TipoUsuario {
          id
          nome
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      status {
        id
        status
        createdAt
        updatedAt
      }
      nome_tarefa
      data_inicio
      data_fim
      TarefaOrigem {
        id
        CronogramaObra {
          id
          data_inicio
          data_fim
          tempo_previsto
          gasto_previsto
          createdAt
          updatedAt
        }
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
          createdAt
          updatedAt
        }
        status {
          id
          status
          createdAt
          updatedAt
        }
        nome_tarefa
        data_inicio
        data_fim
        TarefaOrigem {
          id
          nome_tarefa
          data_inicio
          data_fim
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        CronogramaObra {
          id
          data_inicio
          data_fim
          tempo_previsto
          gasto_previsto
          createdAt
          updatedAt
        }
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
          createdAt
          updatedAt
        }
        status {
          id
          status
          createdAt
          updatedAt
        }
        nome_tarefa
        data_inicio
        data_fim
        TarefaOrigem {
          id
          nome_tarefa
          data_inicio
          data_fim
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStatusTarefa = /* GraphQL */ `
  query GetStatusTarefa($id: ID!) {
    getStatusTarefa(id: $id) {
      id
      status
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAgendaObra = /* GraphQL */ `
  query GetAgendaObra($id: ID!) {
    getAgendaObra(id: $id) {
      id
      Obra {
        id
        nome
        foto
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          createdAt
          updatedAt
        }
        TipoObra {
          id
          nome
          template
          createdAt
          updatedAt
        }
        Empresa {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          createdAt
          updatedAt
        }
        Usuarios {
          nextToken
        }
        createdAt
        updatedAt
      }
      titulo
      descricao
      data_inicio
      data_fim
      duracao
      createdAt
      updatedAt
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
        Obra {
          id
          nome
          foto
          createdAt
          updatedAt
        }
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAgendaParticular = /* GraphQL */ `
  query GetAgendaParticular($id: ID!) {
    getAgendaParticular(id: $id) {
      id
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
        Empresas {
          nextToken
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
          createdAt
          updatedAt
        }
        TipoUsuario {
          id
          nome
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      titulo
      descricao
      data_inicio
      data_fim
      duracao
      createdAt
      updatedAt
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
          createdAt
          updatedAt
        }
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLembreteParticular = /* GraphQL */ `
  query GetLembreteParticular($id: ID!) {
    getLembreteParticular(id: $id) {
      id
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
        Empresas {
          nextToken
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
          createdAt
          updatedAt
        }
        TipoUsuario {
          id
          nome
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      titulo
      descricao
      data_inicio
      data_fim
      duracao
      createdAt
      updatedAt
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
          createdAt
          updatedAt
        }
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLembreteObra = /* GraphQL */ `
  query GetLembreteObra($id: ID!) {
    getLembreteObra(id: $id) {
      id
      Obra {
        id
        nome
        foto
        Endereco {
          id
          cep
          bairro
          cidade
          rua
          estado
          pais
          numero
          createdAt
          updatedAt
        }
        TipoObra {
          id
          nome
          template
          createdAt
          updatedAt
        }
        Empresa {
          id
          nome
          cnpj
          telefone
          email
          usuarioID
          foto
          createdAt
          updatedAt
        }
        Usuarios {
          nextToken
        }
        createdAt
        updatedAt
      }
      titulo
      descricao
      data_inicio
      data_fim
      duracao
      createdAt
      updatedAt
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
        Obra {
          id
          nome
          foto
          createdAt
          updatedAt
        }
        titulo
        descricao
        data_inicio
        data_fim
        duracao
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
