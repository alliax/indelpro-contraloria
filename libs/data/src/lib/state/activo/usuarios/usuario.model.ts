export interface Usuario {
  _id?: string;
  nombre: string;
  email: string;
  profile: any;
}

export function createUsuario(params: Partial<Usuario>) {
  return {
    ...params
  } as Usuario;
}
