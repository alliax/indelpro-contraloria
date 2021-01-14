import { DataModel, DeletedPropertiesModel } from '@alliax/feathers-client';

export interface SapFormas extends DataModel, DeletedPropertiesModel {
  nombre: string;
  ashost: string;
  sysid: string;
  sysnr: string;
  client: string;
  user: string;
  passwd: string;
  lang: string;
  activo?: boolean;
}

export function createSapFormas(params: Partial<SapFormas>) {
  return { ...params } as SapFormas;
}
