// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Empresa, Endereco, Usuario, TipoUsuario, Obra, TipoObra, CronogramaObra, ControleFinanceiroObra, Tarefa, StatusTarefa, AgendaObra, AgendaParticular, LembreteParticular, LembreteObra } = initSchema(schema);

export {
  Empresa,
  Endereco,
  Usuario,
  TipoUsuario,
  Obra,
  TipoObra,
  CronogramaObra,
  ControleFinanceiroObra,
  Tarefa,
  StatusTarefa,
  AgendaObra,
  AgendaParticular,
  LembreteParticular,
  LembreteObra
};