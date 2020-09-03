import { DataModel, DeletedPropertiesModel } from '@alliax/feathers-client';
import { Sap } from '../sap/sap.model';
import { Adjunto } from '../adjuntos/adjunto.model';
import { Ubicacion } from '../../../..';

export interface ExpedienteHeader {
  AKTIV: string;
  ANLKL: string;
  ANLN1: string;
  TXT501: string;
  ANLN2: string;
  TXT502: string;
  GJAHR_CAPI: number;
  MONTO_CAPIT: number;
  POSID: string;
  POST1: string;
  PPTO_USD: number;
  REAL_USD: number;
  SERNR: string;
  TPOACT: string;
}

export interface ExpedienteDet {
  AUGDT: string;
  BELNR: string;
  BUDAT: string;
  DMBE2: number;
  DMBT1: number;
  EBELN: string;
  EBELP: string;
  KZKRS: number; // tipo de cambio
  LIFNR: string;
  NAME1: string;
  PAIS: string;
  PEDIMENTO: string;
  SGTXT: string;
  SHKZG: string;
  WAERS: string;
  WRBT1: number;
  ZADUANA: string;
  ZFCHPAGO: string;
  ZPATENTE: string;
  ZPEDIMENTO: string;
  ZUONR: string;
}

export interface ExpedienteActRel {
  ANLN1: string;
  TXT50: string;
}

export interface Expediente extends DataModel, DeletedPropertiesModel {
  PROJK: string;
  NAME1: string;
  ANLN1: string;
  TXT50: string;
  AKTIV: Date;
  GJAHR_CAPI: number;
  ANLKL: string;
  TPOACT: string;
  sap?: Sap;
  sapId?: string;

  HEADER: ExpedienteHeader;
  DET: [ExpedienteDet];
  ACT_REL: [ExpedienteActRel];

  fotosId: string[];
  fotos: Adjunto[];
  autorizacionProyectosId: string[];
  autorizacionProyectos: Adjunto[];
  capitalizacionProyectosId: string[];
  capitalizacionProyectos: Adjunto[];
  ubicacionId: string;
  ubicacion: Ubicacion;
}

export function createExpediente(params: Partial<Expediente>) {
  return { ...params } as Expediente;
}
