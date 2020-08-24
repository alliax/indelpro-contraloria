import { DataModel, DeletedPropertiesModel } from '@alliax/feathers-client';

export interface Adjunto extends DataModel, DeletedPropertiesModel {
  nombre: string;
  archivo: string;
}

export function createAdjunto(params: Partial<Adjunto>) {
  return {
    ...params,
  } as Adjunto;
}
