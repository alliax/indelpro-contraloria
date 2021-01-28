import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Client, RfcConnectionParameters } from 'node-rfc';

interface Pendientes {
  PROCESO?: string;
  TEXTO?: string;
  ID?: number;
  USER_SOLICITUD?: string;
  USER_NOMBRE?: string;
  FECHA_SOLICITUD?: string;
  HORA_SOLICITUD?: string;
  USER_AUTORIZA?: string;
  NIVEL?: string;
}

/*interface PendientesAlliax {
  AMOUNT: "1000.00"
  AMOUNTUSD: "0.00"
  DESTINO: ""
  DOCUMENT: "Definitiva"
  IDWF: "347"
  IDWFC: "SP347"
  OBJECT: "INDPSP"
  REQNAME: "EUGENIO GOMEZ CORTAZA"
  STATUS: "PENDIENTE"
  STEP: "01"
  TITLE: "Prueba de Sol Definitiva 2 GdeL"
  TYPE: "SP"
  WAERS: "MXN"
  ZCOMMENT: ""
  ZDATE: "20200707"
}*/

interface Solicitud {
  HTML: string;
  PDF: string;
}
function createSolicitud(params: Partial<Solicitud>) {
  let HTML = params.HTML || '';
  const { PDF } = params;
  HTML = HTML.replace(/\<img.*line2.jpg\"\>/gim, '');
  HTML = HTML.replace(/\<img.*line.jpg\"\>/gim, '');
  return {
    HTML,
    PDF,
  } as Solicitud;
}
interface ServiceOptions {}

export class SolicitudesIndelpro
  implements ServiceMethods<Pendientes | Solicitud> {
  app: Application;
  options: ServiceOptions;
  private indelproSAP: any;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  private async getSap(): Promise<RfcConnectionParameters> {
    const configuracionActiva: any[] = (await this.app
      .service(this.app.get('path') + 'formas/configuracion')
      .find({
        query: {
          activo: true,
        },
        paginate: false,
      })) as any[];
    const sapSystem = await this.app
      .service(this.app.get('path') + 'formas/sap')
      .get(configuracionActiva[0].sapIndelproId);
    return sapSystem;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<any[] | Paginated<any>> {
    try {
      this.indelproSAP = await this.getSap();
      const userSap = params?.user?.profile?.userSapIndelpro;
      const client: Client = new Client(this.indelproSAP);
      await client.open();

      const functionName = 'ZGET_PENDING_WF';
      const pendientes = await client.call(functionName, {
        USER_AUTORIZA: userSap,
      });
      const registros: Pendientes[] = [...(pendientes.PENDING_LIST as any[])];

      return registros.map((registro) => ({
        AMOUNT: null,
        AMOUNTUSD: null,
        DESTINO: null,
        DOCUMENT: null,
        IDWF: registro.ID,
        IDWFC: registro.ID,
        OBJECT: registro.USER_SOLICITUD,
        REQNAME: registro.USER_NOMBRE,
        STATUS: 'PENDIENTE',
        STEP: registro.NIVEL,
        TITLE: registro.TEXTO,
        TYPE: registro.PROCESO,
        WAERS: null,
        ZCOMMENT: null,
        ZDATE: registro.FECHA_SOLICITUD,
        TIPO: 'INDELPRO',
      }));
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Solicitud> {
    try {
      this.indelproSAP = await this.getSap();
      const userSap = params?.user?.profile?.userSapIndelpro;
      const proceso = params?.query?.proceso;
      const client: Client = new Client(this.indelproSAP);
      await client.open();

      const functionName = 'ZGET_INFOPAGE_WF';
      const sapResponse: any = await client.call(functionName, {
        ID: id,
        PROCESO_I: proceso,
        USER_AUTORIZA: userSap,
      });
      return createSolicitud(sapResponse);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Solicitud, params?: Params): Promise<Solicitud> {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: any, params?: Params): Promise<any> {
    if (!id) throw new Error('ID missing');
    try {
      this.indelproSAP = await this.getSap();
      const userSap = params?.user?.profile?.userSapIndelpro;
      const proceso = data?.proceso;
      const decision = data?.decision;
      const client: Client = new Client(this.indelproSAP);
      await client.open();
      const functionName = 'ZAUTORIZACION_WF';
      const sapResponse = await client.call(functionName, {
        PROCESO: proceso,
        ID: id,
        DECISION: decision,
        USER_AUTORIZA: userSap,
      });
      return sapResponse;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(
    id: NullableId,
    data: Solicitud,
    params?: Params
  ): Promise<Solicitud> {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Solicitud> {
    throw new Error('Not implemented');
  }
}
