/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEmpresa = /* GraphQL */ `
  subscription OnCreateEmpresa {
    onCreateEmpresa {
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
export const onUpdateEmpresa = /* GraphQL */ `
  subscription OnUpdateEmpresa {
    onUpdateEmpresa {
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
export const onDeleteEmpresa = /* GraphQL */ `
  subscription OnDeleteEmpresa {
    onDeleteEmpresa {
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
export const onCreateEndereco = /* GraphQL */ `
  subscription OnCreateEndereco {
    onCreateEndereco {
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
export const onUpdateEndereco = /* GraphQL */ `
  subscription OnUpdateEndereco {
    onUpdateEndereco {
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
export const onDeleteEndereco = /* GraphQL */ `
  subscription OnDeleteEndereco {
    onDeleteEndereco {
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
export const onCreateUsuario = /* GraphQL */ `
  subscription OnCreateUsuario {
    onCreateUsuario {
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
export const onUpdateUsuario = /* GraphQL */ `
  subscription OnUpdateUsuario {
    onUpdateUsuario {
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
export const onDeleteUsuario = /* GraphQL */ `
  subscription OnDeleteUsuario {
    onDeleteUsuario {
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
export const onCreateTipoUsuario = /* GraphQL */ `
  subscription OnCreateTipoUsuario {
    onCreateTipoUsuario {
      id
      nome
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTipoUsuario = /* GraphQL */ `
  subscription OnUpdateTipoUsuario {
    onUpdateTipoUsuario {
      id
      nome
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTipoUsuario = /* GraphQL */ `
  subscription OnDeleteTipoUsuario {
    onDeleteTipoUsuario {
      id
      nome
      createdAt
      updatedAt
    }
  }
`;
export const onCreateObra = /* GraphQL */ `
  subscription OnCreateObra {
    onCreateObra {
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
export const onUpdateObra = /* GraphQL */ `
  subscription OnUpdateObra {
    onUpdateObra {
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
export const onDeleteObra = /* GraphQL */ `
  subscription OnDeleteObra {
    onDeleteObra {
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
export const onCreateTipoObra = /* GraphQL */ `
  subscription OnCreateTipoObra {
    onCreateTipoObra {
      id
      nome
      template
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTipoObra = /* GraphQL */ `
  subscription OnUpdateTipoObra {
    onUpdateTipoObra {
      id
      nome
      template
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTipoObra = /* GraphQL */ `
  subscription OnDeleteTipoObra {
    onDeleteTipoObra {
      id
      nome
      template
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCronogramaObra = /* GraphQL */ `
  subscription OnCreateCronogramaObra {
    onCreateCronogramaObra {
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
export const onUpdateCronogramaObra = /* GraphQL */ `
  subscription OnUpdateCronogramaObra {
    onUpdateCronogramaObra {
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
export const onDeleteCronogramaObra = /* GraphQL */ `
  subscription OnDeleteCronogramaObra {
    onDeleteCronogramaObra {
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
export const onCreateControleFinanceiroObra = /* GraphQL */ `
  subscription OnCreateControleFinanceiroObra {
    onCreateControleFinanceiroObra {
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
export const onUpdateControleFinanceiroObra = /* GraphQL */ `
  subscription OnUpdateControleFinanceiroObra {
    onUpdateControleFinanceiroObra {
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
export const onDeleteControleFinanceiroObra = /* GraphQL */ `
  subscription OnDeleteControleFinanceiroObra {
    onDeleteControleFinanceiroObra {
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
export const onCreateTarefa = /* GraphQL */ `
  subscription OnCreateTarefa {
    onCreateTarefa {
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
export const onUpdateTarefa = /* GraphQL */ `
  subscription OnUpdateTarefa {
    onUpdateTarefa {
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
export const onDeleteTarefa = /* GraphQL */ `
  subscription OnDeleteTarefa {
    onDeleteTarefa {
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
export const onCreateStatusTarefa = /* GraphQL */ `
  subscription OnCreateStatusTarefa {
    onCreateStatusTarefa {
      id
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStatusTarefa = /* GraphQL */ `
  subscription OnUpdateStatusTarefa {
    onUpdateStatusTarefa {
      id
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStatusTarefa = /* GraphQL */ `
  subscription OnDeleteStatusTarefa {
    onDeleteStatusTarefa {
      id
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAgendaObra = /* GraphQL */ `
  subscription OnCreateAgendaObra {
    onCreateAgendaObra {
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
export const onUpdateAgendaObra = /* GraphQL */ `
  subscription OnUpdateAgendaObra {
    onUpdateAgendaObra {
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
export const onDeleteAgendaObra = /* GraphQL */ `
  subscription OnDeleteAgendaObra {
    onDeleteAgendaObra {
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
export const onCreateAgendaParticular = /* GraphQL */ `
  subscription OnCreateAgendaParticular {
    onCreateAgendaParticular {
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
export const onUpdateAgendaParticular = /* GraphQL */ `
  subscription OnUpdateAgendaParticular {
    onUpdateAgendaParticular {
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
export const onDeleteAgendaParticular = /* GraphQL */ `
  subscription OnDeleteAgendaParticular {
    onDeleteAgendaParticular {
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
export const onCreateLembreteParticular = /* GraphQL */ `
  subscription OnCreateLembreteParticular {
    onCreateLembreteParticular {
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
export const onUpdateLembreteParticular = /* GraphQL */ `
  subscription OnUpdateLembreteParticular {
    onUpdateLembreteParticular {
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
export const onDeleteLembreteParticular = /* GraphQL */ `
  subscription OnDeleteLembreteParticular {
    onDeleteLembreteParticular {
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
export const onCreateLembreteObra = /* GraphQL */ `
  subscription OnCreateLembreteObra {
    onCreateLembreteObra {
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
export const onUpdateLembreteObra = /* GraphQL */ `
  subscription OnUpdateLembreteObra {
    onUpdateLembreteObra {
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
export const onDeleteLembreteObra = /* GraphQL */ `
  subscription OnDeleteLembreteObra {
    onDeleteLembreteObra {
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
