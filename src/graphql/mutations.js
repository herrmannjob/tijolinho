/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEmpresa = /* GraphQL */ `
  mutation CreateEmpresa(
    $input: CreateEmpresaInput!
    $condition: ModelEmpresaConditionInput
  ) {
    createEmpresa(input: $input, condition: $condition) {
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
export const updateEmpresa = /* GraphQL */ `
  mutation UpdateEmpresa(
    $input: UpdateEmpresaInput!
    $condition: ModelEmpresaConditionInput
  ) {
    updateEmpresa(input: $input, condition: $condition) {
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
export const deleteEmpresa = /* GraphQL */ `
  mutation DeleteEmpresa(
    $input: DeleteEmpresaInput!
    $condition: ModelEmpresaConditionInput
  ) {
    deleteEmpresa(input: $input, condition: $condition) {
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
export const createEndereco = /* GraphQL */ `
  mutation CreateEndereco(
    $input: CreateEnderecoInput!
    $condition: ModelEnderecoConditionInput
  ) {
    createEndereco(input: $input, condition: $condition) {
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
export const updateEndereco = /* GraphQL */ `
  mutation UpdateEndereco(
    $input: UpdateEnderecoInput!
    $condition: ModelEnderecoConditionInput
  ) {
    updateEndereco(input: $input, condition: $condition) {
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
export const deleteEndereco = /* GraphQL */ `
  mutation DeleteEndereco(
    $input: DeleteEnderecoInput!
    $condition: ModelEnderecoConditionInput
  ) {
    deleteEndereco(input: $input, condition: $condition) {
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
export const createUsuario = /* GraphQL */ `
  mutation CreateUsuario(
    $input: CreateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    createUsuario(input: $input, condition: $condition) {
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
export const updateUsuario = /* GraphQL */ `
  mutation UpdateUsuario(
    $input: UpdateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    updateUsuario(input: $input, condition: $condition) {
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
export const deleteUsuario = /* GraphQL */ `
  mutation DeleteUsuario(
    $input: DeleteUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    deleteUsuario(input: $input, condition: $condition) {
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
export const createTipoUsuario = /* GraphQL */ `
  mutation CreateTipoUsuario(
    $input: CreateTipoUsuarioInput!
    $condition: ModelTipoUsuarioConditionInput
  ) {
    createTipoUsuario(input: $input, condition: $condition) {
      id
      nome
      createdAt
      updatedAt
    }
  }
`;
export const updateTipoUsuario = /* GraphQL */ `
  mutation UpdateTipoUsuario(
    $input: UpdateTipoUsuarioInput!
    $condition: ModelTipoUsuarioConditionInput
  ) {
    updateTipoUsuario(input: $input, condition: $condition) {
      id
      nome
      createdAt
      updatedAt
    }
  }
`;
export const deleteTipoUsuario = /* GraphQL */ `
  mutation DeleteTipoUsuario(
    $input: DeleteTipoUsuarioInput!
    $condition: ModelTipoUsuarioConditionInput
  ) {
    deleteTipoUsuario(input: $input, condition: $condition) {
      id
      nome
      createdAt
      updatedAt
    }
  }
`;
export const createObra = /* GraphQL */ `
  mutation CreateObra(
    $input: CreateObraInput!
    $condition: ModelObraConditionInput
  ) {
    createObra(input: $input, condition: $condition) {
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
export const updateObra = /* GraphQL */ `
  mutation UpdateObra(
    $input: UpdateObraInput!
    $condition: ModelObraConditionInput
  ) {
    updateObra(input: $input, condition: $condition) {
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
export const deleteObra = /* GraphQL */ `
  mutation DeleteObra(
    $input: DeleteObraInput!
    $condition: ModelObraConditionInput
  ) {
    deleteObra(input: $input, condition: $condition) {
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
export const createTipoObra = /* GraphQL */ `
  mutation CreateTipoObra(
    $input: CreateTipoObraInput!
    $condition: ModelTipoObraConditionInput
  ) {
    createTipoObra(input: $input, condition: $condition) {
      id
      nome
      template
      createdAt
      updatedAt
    }
  }
`;
export const updateTipoObra = /* GraphQL */ `
  mutation UpdateTipoObra(
    $input: UpdateTipoObraInput!
    $condition: ModelTipoObraConditionInput
  ) {
    updateTipoObra(input: $input, condition: $condition) {
      id
      nome
      template
      createdAt
      updatedAt
    }
  }
`;
export const deleteTipoObra = /* GraphQL */ `
  mutation DeleteTipoObra(
    $input: DeleteTipoObraInput!
    $condition: ModelTipoObraConditionInput
  ) {
    deleteTipoObra(input: $input, condition: $condition) {
      id
      nome
      template
      createdAt
      updatedAt
    }
  }
`;
export const createCronogramaObra = /* GraphQL */ `
  mutation CreateCronogramaObra(
    $input: CreateCronogramaObraInput!
    $condition: ModelCronogramaObraConditionInput
  ) {
    createCronogramaObra(input: $input, condition: $condition) {
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
export const updateCronogramaObra = /* GraphQL */ `
  mutation UpdateCronogramaObra(
    $input: UpdateCronogramaObraInput!
    $condition: ModelCronogramaObraConditionInput
  ) {
    updateCronogramaObra(input: $input, condition: $condition) {
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
export const deleteCronogramaObra = /* GraphQL */ `
  mutation DeleteCronogramaObra(
    $input: DeleteCronogramaObraInput!
    $condition: ModelCronogramaObraConditionInput
  ) {
    deleteCronogramaObra(input: $input, condition: $condition) {
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
export const createControleFinanceiroObra = /* GraphQL */ `
  mutation CreateControleFinanceiroObra(
    $input: CreateControleFinanceiroObraInput!
    $condition: ModelControleFinanceiroObraConditionInput
  ) {
    createControleFinanceiroObra(input: $input, condition: $condition) {
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
export const updateControleFinanceiroObra = /* GraphQL */ `
  mutation UpdateControleFinanceiroObra(
    $input: UpdateControleFinanceiroObraInput!
    $condition: ModelControleFinanceiroObraConditionInput
  ) {
    updateControleFinanceiroObra(input: $input, condition: $condition) {
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
export const deleteControleFinanceiroObra = /* GraphQL */ `
  mutation DeleteControleFinanceiroObra(
    $input: DeleteControleFinanceiroObraInput!
    $condition: ModelControleFinanceiroObraConditionInput
  ) {
    deleteControleFinanceiroObra(input: $input, condition: $condition) {
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
export const createTarefa = /* GraphQL */ `
  mutation CreateTarefa(
    $input: CreateTarefaInput!
    $condition: ModelTarefaConditionInput
  ) {
    createTarefa(input: $input, condition: $condition) {
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
export const updateTarefa = /* GraphQL */ `
  mutation UpdateTarefa(
    $input: UpdateTarefaInput!
    $condition: ModelTarefaConditionInput
  ) {
    updateTarefa(input: $input, condition: $condition) {
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
export const deleteTarefa = /* GraphQL */ `
  mutation DeleteTarefa(
    $input: DeleteTarefaInput!
    $condition: ModelTarefaConditionInput
  ) {
    deleteTarefa(input: $input, condition: $condition) {
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
export const createStatusTarefa = /* GraphQL */ `
  mutation CreateStatusTarefa(
    $input: CreateStatusTarefaInput!
    $condition: ModelStatusTarefaConditionInput
  ) {
    createStatusTarefa(input: $input, condition: $condition) {
      id
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateStatusTarefa = /* GraphQL */ `
  mutation UpdateStatusTarefa(
    $input: UpdateStatusTarefaInput!
    $condition: ModelStatusTarefaConditionInput
  ) {
    updateStatusTarefa(input: $input, condition: $condition) {
      id
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteStatusTarefa = /* GraphQL */ `
  mutation DeleteStatusTarefa(
    $input: DeleteStatusTarefaInput!
    $condition: ModelStatusTarefaConditionInput
  ) {
    deleteStatusTarefa(input: $input, condition: $condition) {
      id
      status
      createdAt
      updatedAt
    }
  }
`;
export const createAgendaObra = /* GraphQL */ `
  mutation CreateAgendaObra(
    $input: CreateAgendaObraInput!
    $condition: ModelAgendaObraConditionInput
  ) {
    createAgendaObra(input: $input, condition: $condition) {
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
export const updateAgendaObra = /* GraphQL */ `
  mutation UpdateAgendaObra(
    $input: UpdateAgendaObraInput!
    $condition: ModelAgendaObraConditionInput
  ) {
    updateAgendaObra(input: $input, condition: $condition) {
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
export const deleteAgendaObra = /* GraphQL */ `
  mutation DeleteAgendaObra(
    $input: DeleteAgendaObraInput!
    $condition: ModelAgendaObraConditionInput
  ) {
    deleteAgendaObra(input: $input, condition: $condition) {
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
export const createAgendaParticular = /* GraphQL */ `
  mutation CreateAgendaParticular(
    $input: CreateAgendaParticularInput!
    $condition: ModelAgendaParticularConditionInput
  ) {
    createAgendaParticular(input: $input, condition: $condition) {
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
export const updateAgendaParticular = /* GraphQL */ `
  mutation UpdateAgendaParticular(
    $input: UpdateAgendaParticularInput!
    $condition: ModelAgendaParticularConditionInput
  ) {
    updateAgendaParticular(input: $input, condition: $condition) {
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
export const deleteAgendaParticular = /* GraphQL */ `
  mutation DeleteAgendaParticular(
    $input: DeleteAgendaParticularInput!
    $condition: ModelAgendaParticularConditionInput
  ) {
    deleteAgendaParticular(input: $input, condition: $condition) {
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
export const createLembreteParticular = /* GraphQL */ `
  mutation CreateLembreteParticular(
    $input: CreateLembreteParticularInput!
    $condition: ModelLembreteParticularConditionInput
  ) {
    createLembreteParticular(input: $input, condition: $condition) {
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
export const updateLembreteParticular = /* GraphQL */ `
  mutation UpdateLembreteParticular(
    $input: UpdateLembreteParticularInput!
    $condition: ModelLembreteParticularConditionInput
  ) {
    updateLembreteParticular(input: $input, condition: $condition) {
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
export const deleteLembreteParticular = /* GraphQL */ `
  mutation DeleteLembreteParticular(
    $input: DeleteLembreteParticularInput!
    $condition: ModelLembreteParticularConditionInput
  ) {
    deleteLembreteParticular(input: $input, condition: $condition) {
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
export const createLembreteObra = /* GraphQL */ `
  mutation CreateLembreteObra(
    $input: CreateLembreteObraInput!
    $condition: ModelLembreteObraConditionInput
  ) {
    createLembreteObra(input: $input, condition: $condition) {
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
export const updateLembreteObra = /* GraphQL */ `
  mutation UpdateLembreteObra(
    $input: UpdateLembreteObraInput!
    $condition: ModelLembreteObraConditionInput
  ) {
    updateLembreteObra(input: $input, condition: $condition) {
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
export const deleteLembreteObra = /* GraphQL */ `
  mutation DeleteLembreteObra(
    $input: DeleteLembreteObraInput!
    $condition: ModelLembreteObraConditionInput
  ) {
    deleteLembreteObra(input: $input, condition: $condition) {
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
