import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Client, RfcConnectionParameters } from 'node-rfc';
import { SapSettings } from '../../activo/sap-settings/sap-settings.class';

interface SolicitudesCompra {
  WI_ID: string;
  WI_LANG: string;
  WI_TEXT: string;
  WI_CD: string;
  WI_CT: string;
  OBJID: string;
  OBJECT_ID: string;
  POSTING_DATE: string;
  DESCRIPTION: string;
  REQ_NAME: string;
  CURRENCY: string;
  TOTAL_VALUE: string;
}

interface SolicitudCompra {
  P_TASKS: string;
  TI_CONTENTS: {
    LINE: string;
  }[];
}

interface SolicitudCompraHtml {
  HTML: string;
}

function createSolicitud(solicitud: SolicitudCompra) {
  let html = '';
  for (let i = 0; i < solicitud.TI_CONTENTS.length; i++) {
    html += solicitud.TI_CONTENTS[i].LINE;
  }
  html = html.replace('TABLE width="909"', 'TABLE');
  html = html.replace('\n\r', '');
  html = html.replace(/Para autorizar.*pulsadores:/gms, '');
  html = html.replace(/Para ver esta.*<\/a>\./gms, '');
  html = html.replace(/<!--#.*BEGIN.*END#-->/gms, '');
  return {
    HTML: html,
  } as SolicitudCompraHtml;
}
interface ServiceOptions {}

export class SolicitudesCompras
  implements
    ServiceMethods<SolicitudesCompra | SolicitudCompra | SolicitudCompraHtml> {
  app: Application;
  options: ServiceOptions;
  comprasSAP: any;

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
      .get(configuracionActiva[0].sapComprasId);
    return sapSystem;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<any[] | Paginated<any>> {
    try {
      this.comprasSAP = await this.getSap();
      const userSap = params?.user?.profile?.userSap;
      const client: Client = new Client(this.comprasSAP);
      await client.open();

      const functionName = 'ZALX_GET_APPROVAL_LIST';
      const pendientes = await client.call(functionName, {
        I_USER: userSap,
      });
      const registros: SolicitudesCompra[] = [
        ...(pendientes.E_APP_LIST as any[]),
      ];
      return registros.map((registro) => ({
        AMOUNT: registro.TOTAL_VALUE,
        AMOUNTUSD: null,
        DESTINO: null,
        DOCUMENT: null,
        IDWF: registro.WI_ID,
        IDWFC: registro.OBJECT_ID,
        OBJECT: registro.OBJID,
        REQNAME: registro.REQ_NAME,
        STATUS: 'PENDIENTE',
        STEP: '',
        TITLE: registro.DESCRIPTION,
        TYPE: 'COMPRAS',
        WAERS: null,
        ZCOMMENT: null,
        ZDATE: registro.WI_CD,
        TIPO: 'COMPRAS',
      }));
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<SolicitudCompraHtml> {
    try {
      this.comprasSAP = await this.getSap();
      const client: Client = new Client(this.comprasSAP);
      await client.open();
      const functionName = 'ZACE_FG_RSWUWFMLEC_2';
      const sapResponse: any = await client.call(functionName, {
        P_TASKS: id,
      });
      return createSolicitud(sapResponse);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(
    data: SolicitudCompra,
    params?: Params
  ): Promise<SolicitudCompra> {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: any, params?: Params): Promise<any> {
    if (!id) throw new Error('ID missing');
    try {
      this.comprasSAP = await this.getSap();
      const userSap = params?.user?.profile?.userSap;
      const decision = data?.decision;
      const client: Client = new Client(this.comprasSAP);
      await client.open();
      const functionName = 'ZACE_APPROVE_REJECT';
      const sapResponse = await client.call(functionName, {
        LV_WIID: id,
        LV_USER: userSap,
        LV_DEC: decision,
        LV_LANGU: 'es',
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
    data: SolicitudCompra,
    params?: Params
  ): Promise<SolicitudCompra> {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<SolicitudCompra> {
    throw new Error('Not implemented');
  }
}
