import { DataModel, DeletedPropertiesModel } from '@alliax/feathers-client';
import { SapFormas } from '../sap/sap.model';

export interface Configuracion extends DataModel, DeletedPropertiesModel {
  nombre: string;
  activo: boolean;
  sapSrmId: string;
  sapIndelproId: string;
  sapComprasId: string;

  sapSrm: SapFormas;
  sapIndelpro: SapFormas;
  sapCompras: SapFormas;

  url?: string;
}

export function createConfiguracion(params: Partial<Configuracion>) {
  return { ...params } as Configuracion;
}
