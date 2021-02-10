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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
    }
  }
`;
export const onCreateTipoUsuario = /* GraphQL */ `
  subscription OnCreateTipoUsuario {
    onCreateTipoUsuario {
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
export const onUpdateTipoUsuario = /* GraphQL */ `
  subscription OnUpdateTipoUsuario {
    onUpdateTipoUsuario {
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
export const onDeleteTipoUsuario = /* GraphQL */ `
  subscription OnDeleteTipoUsuario {
    onDeleteTipoUsuario {
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
export const onCreateObra = /* GraphQL */ `
  subscription OnCreateObra {
    onCreateObra {
      id
      nome
      foto
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
export const onUpdateObra = /* GraphQL */ `
  subscription OnUpdateObra {
    onUpdateObra {
      id
      nome
      foto
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
export const onDeleteObra = /* GraphQL */ `
  subscription OnDeleteObra {
    onDeleteObra {
      id
      nome
      foto
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
export const onCreateTipoObra = /* GraphQL */ `
  subscription OnCreateTipoObra {
    onCreateTipoObra {
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
export const onUpdateTipoObra = /* GraphQL */ `
  subscription OnUpdateTipoObra {
    onUpdateTipoObra {
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
export const onDeleteTipoObra = /* GraphQL */ `
  subscription OnDeleteTipoObra {
    onDeleteTipoObra {
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
export const onCreateCronogramaObra = /* GraphQL */ `
  subscription OnCreateCronogramaObra {
    onCreateCronogramaObra {
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
export const onUpdateCronogramaObra = /* GraphQL */ `
  subscription OnUpdateCronogramaObra {
    onUpdateCronogramaObra {
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
export const onDeleteCronogramaObra = /* GraphQL */ `
  subscription OnDeleteCronogramaObra {
    onDeleteCronogramaObra {
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
export const onCreateControleFinanceiroObra = /* GraphQL */ `
  subscription OnCreateControleFinanceiroObra {
    onCreateControleFinanceiroObra {
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
export const onUpdateControleFinanceiroObra = /* GraphQL */ `
  subscription OnUpdateControleFinanceiroObra {
    onUpdateControleFinanceiroObra {
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
export const onDeleteControleFinanceiroObra = /* GraphQL */ `
  subscription OnDeleteControleFinanceiroObra {
    onDeleteControleFinanceiroObra {
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
export const onCreateTarefa = /* GraphQL */ `
  subscription OnCreateTarefa {
    onCreateTarefa {
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
export const onUpdateTarefa = /* GraphQL */ `
  subscription OnUpdateTarefa {
    onUpdateTarefa {
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
export const onDeleteTarefa = /* GraphQL */ `
  subscription OnDeleteTarefa {
    onDeleteTarefa {
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
export const onCreateStatusTarefa = /* GraphQL */ `
  subscription OnCreateStatusTarefa {
    onCreateStatusTarefa {
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
export const onUpdateStatusTarefa = /* GraphQL */ `
  subscription OnUpdateStatusTarefa {
    onUpdateStatusTarefa {
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
export const onDeleteStatusTarefa = /* GraphQL */ `
  subscription OnDeleteStatusTarefa {
    onDeleteStatusTarefa {
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
export const onCreateAgendaObra = /* GraphQL */ `
  subscription OnCreateAgendaObra {
    onCreateAgendaObra {
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
export const onUpdateAgendaObra = /* GraphQL */ `
  subscription OnUpdateAgendaObra {
    onUpdateAgendaObra {
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
export const onDeleteAgendaObra = /* GraphQL */ `
  subscription OnDeleteAgendaObra {
    onDeleteAgendaObra {
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
export const onCreateAgendaParticular = /* GraphQL */ `
  subscription OnCreateAgendaParticular {
    onCreateAgendaParticular {
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
      }
    }
  }
`;
export const onUpdateAgendaParticular = /* GraphQL */ `
  subscription OnUpdateAgendaParticular {
    onUpdateAgendaParticular {
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
      }
    }
  }
`;
export const onDeleteAgendaParticular = /* GraphQL */ `
  subscription OnDeleteAgendaParticular {
    onDeleteAgendaParticular {
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
      }
    }
  }
`;
export const onCreateLembreteParticular = /* GraphQL */ `
  subscription OnCreateLembreteParticular {
    onCreateLembreteParticular {
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
      }
    }
  }
`;
export const onUpdateLembreteParticular = /* GraphQL */ `
  subscription OnUpdateLembreteParticular {
    onUpdateLembreteParticular {
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
      }
    }
  }
`;
export const onDeleteLembreteParticular = /* GraphQL */ `
  subscription OnDeleteLembreteParticular {
    onDeleteLembreteParticular {
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
      }
    }
  }
`;
export const onCreateLembreteObra = /* GraphQL */ `
  subscription OnCreateLembreteObra {
    onCreateLembreteObra {
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
export const onUpdateLembreteObra = /* GraphQL */ `
  subscription OnUpdateLembreteObra {
    onUpdateLembreteObra {
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
export const onDeleteLembreteObra = /* GraphQL */ `
  subscription OnDeleteLembreteObra {
    onDeleteLembreteObra {
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
