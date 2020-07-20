import { DataModel } from '@alliax/feathers-client';

export interface TipoActivo extends DataModel {
  nombre: string;
  imagen: string;
  claveSap: string;
}

export function createTipoActivo(params: Partial<TipoActivo>) {
  return { ...params } as TipoActivo;
}
