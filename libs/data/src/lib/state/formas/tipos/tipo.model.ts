export interface Tipo {
  _id: string;
  clave: string;
  nombre: string;
}

export function createTipo(params: Partial<Tipo>) {
  return {
    ...params,
  } as Tipo;
}
