import { DataModel, User } from '@alliax/feathers-client';

export interface Usuario extends User, DataModel {}

export function createUsuario(params: Partial<Usuario>) {
  return {
    ...params,
  } as Usuario;
}
