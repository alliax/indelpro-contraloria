export interface Solicitud {
  _id: string;
  OBJECT: string;
  IDWF: string;
  ZDATE: Date;
  STATUS: string;
  AMOUNT: string;
  TITLE: string;
  TYPE: string;
  IDWFC: string;
  REQNAME: string;
  DOCUMENT: string;
  STEP: string;
  DESTINO: string;
  AMOUNTUSD: string;
  ZCOMMENT: string;
  WAERS: string;
}

export function createSolicitud(params: Partial<Solicitud>) {
  return { ...params } as Solicitud;
}
