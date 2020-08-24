import { Activo, TipoActivo } from '@indelpro-contraloria/data';

export interface GrupoActivo {
  tipoActivo: TipoActivo;
  valor: number;
  registros: Activo[];
  activos: number;
}

export function createGrupoActivo(params: Partial<GrupoActivo>) {
  return { ...params } as GrupoActivo;
}
