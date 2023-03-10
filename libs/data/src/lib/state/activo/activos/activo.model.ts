import { DataModel } from '@alliax/feathers-client';
import { Sap } from '../sap/sap.model';

export interface Activo extends DataModel {
  ANLN1: string;
  TXT50: string;
  TXA50: string;
  AKTIV: Date;
  GJAHR_CAPI: number;
  ANLKL: number;
  TPOACT: string;
  POSNR: string;
  KANSW: number;
  sap?: Sap;
  sapId?: string;
}

export function createActivo(params: Partial<Activo>) {
  return {
    ...params,
  } as Activo;
}
