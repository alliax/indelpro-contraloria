import { DataModel } from '@alliax/feathers-client';

export interface GrupoUbicacion extends DataModel {
  nombre: string;
  activo: boolean;
  orden: number;
}

export function createGrupoUbicacion(params: Partial<GrupoUbicacion>) {
  return {
    ...params,
  } as GrupoUbicacion;
}
