import { DataModel } from '@alliax/feathers-client';

export interface Expediente extends DataModel {
  // _id?: string;
  // nombre: string;
  // tipo: string;
  // numeroActivo: string;
  // numeroActivoRelacionado: string;
  // numeroTag: string;
  // numeroSAI: string;
  // fechaCapitalizacion: Date;
  // montoCapitalizado: number;
  // moneda: string;
  PROJK: string;
  NAME1: string;
  ANLN1: string;
  TXT50: string;
  AKTIV: Date;
  GJAHR_CAPI: number;
  ANLKL: string;
  TPOACT: string;
}

export function createExpediente(params: Partial<Expediente>) {
  return { ...params } as Expediente;
}
