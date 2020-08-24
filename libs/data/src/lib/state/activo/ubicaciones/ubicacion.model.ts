import { DataModel } from '@alliax/feathers-client';
import { GrupoUbicacion } from '../grupo-ubicaciones/grupo-ubicacion.model';

export interface Ubicacion extends DataModel {
  nombre: string;
  grupoUbicacionId: string;
  grupoUbicacion?: GrupoUbicacion;
  activo: boolean;
}

export function createUbicacion(params: Partial<Ubicacion>) {
  return {
    ...params,
  } as Ubicacion;
}
