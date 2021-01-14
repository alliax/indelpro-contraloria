import { DataModel, DeletedPropertiesModel } from '@alliax/feathers-client';

export interface SolicitudesIndelpro extends DataModel, DeletedPropertiesModel {
  _id: string;
  PROCESO: string;
  TEXTO: string;
  ID: string;
  USER_SOLICITUD: string;
  USER_NOMBRE: string;
  FECHA_SOLICITUD: Date;
  HORA_SOLICITUD: string;
  USER_AUTORIZA: string;
  NIVEL: string;
}

export function createSolicitudesIndelpro(
  params: Partial<SolicitudesIndelpro>
) {
  return { ...params } as SolicitudesIndelpro;
}
