import { DataModel } from '@alliax/feathers-client';

export interface Sap extends DataModel {
  nombre: string;
  ashost: string;
  sysid: string;
  sysnr: string;
  client: string;
  user: string;
  passwd: string;
  lang: string;
  activo: boolean;
  P_BUKRS: string;
}

export function createSap(params: Partial<Sap>) {
  return { ...params } as Sap;
}
