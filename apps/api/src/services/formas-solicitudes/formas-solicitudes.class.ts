import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { RfcConnectionParameters, Client } from 'node-rfc';
import * as xml2js from 'xml2js';
import {
  firstCharLowerCase,
  parseBooleans,
  parseNumbers,
  stripPrefix,
} from 'xml2js/lib/processors';

interface Data {}

interface Approve {
  ACTION: string;
  STEP: string;
  USER: string;
}

interface ServiceOptions {}

/*
ZCS_GETUSER
ZCS_AUTORIZA_SP

ZCS_GETINFO_REPORT

ZCS_GETINFO_PEND
ZCS_GETINFO_SP
ZCS_GETINFO_SP_AI
ZCS_GETINFO_SP_MB
ZCS_GETINFO_SP_MULT

ZCS_GETUSER_FIRMASCTRL

ZCS_GET_APPROVERS_BY_STEP

ZXML_APPROV
ZXML_APPROV_MOVIL
ZXML_APPROV_MOVIL_AIG

ZXML_LEE_XML
IDWF
XSisplay
Objeto: 'indpsp'
Salida: STR_OUTPUT

ZCS_SPMAIN_MOVIL
ZCS_SPMAIN_MOVIL_MULT
*/

export class FormasSolicitudes implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;
  abapSystem: RfcConnectionParameters = {
    user: 'EFRFC005',
    passwd: 'EFMOVIL1',
    client: '100',
    sysnr: '00',
    // ashost: '10.128.160.40', // PRD
    ashost: '10.128.160.49',
    lang: 'en',
  };

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    const userSap = params?.user?.profile?.userSap;
    const variant = params?.user?.profile?.variant;
    try {
      const client: Client = new Client(this.abapSystem);
      await client.open();

      // User Memo IND113  // Lalo CSINFO_ENF

      const functionName = 'ZCS_GETINFO_SP';
      const pendientes = await client.call(functionName, {
        P_STATUS: 'PENDIENTES',
        P_VARIANT: variant,
        P_USERID: userSap,
      });
      const enviadas = await client.call(functionName, {
        P_STATUS: 'ENVIADO',
        P_VARIANT: variant,
        P_USERID: userSap,
      });
      const registros: any[] = [
        ...(pendientes.INFO as any[]),
        ...(enviadas.INFO as any[]),
      ];
      await client.close();
      for (let i = 0; i < registros.length; i++) {
        registros[i].IDWF = registros[i].IDWF.replace(/^(?!0$)0+/, '');
      }

      return registros;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  async get(id: Id, params?: Params): Promise<Data> {
    const object = params?.user?.profile?.object;
    try {
      const client: Client = new Client(this.abapSystem);
      await client.open();
      const functionName = 'ZXML_LEE_XML';
      const result = await client.call(functionName, {
        IDWF: id,
        OBJETO: object,
      });
      await client.close();
      const parser = new xml2js.Parser({
        explicitArray: false,
        // explicitChildren: true,
        // mergeAttrs: true,
        trim: true,
        explicitRoot: false,
        emptyTag: null,
        tagNameProcessors: [
          firstCharLowerCase,
          stripPrefix,
          parseNumbers,
          parseBooleans,
        ],
        attrNameProcessors: [
          firstCharLowerCase,
          stripPrefix,
          parseNumbers,
          parseBooleans,
        ],
        valueProcessors: [parseNumbers, parseBooleans],
        attrValueProcessors: [parseNumbers, parseBooleans],
        validator: (xpath: string, currentValue: any, newValue: any) => {
          switch (xpath) {
            case '/form/comments':
              if (newValue && newValue.comment) {
                return [newValue.comment];
              }
              break;
            case '/form/approvalFlow':
              if (newValue && newValue.approver) {
                return [...newValue.approver];
              }
              break;
          }
          return newValue;
        },
      });
      return parser.parseStringPromise(result.STR_OUTPUT);
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  async create(data: Data, params?: Params): Promise<Data> {
    throw new Error('Not implemented');
  }

  async update(id: string, data: Approve, params?: Params): Promise<Data> {
    const { ACTION, STEP } = data;
    try {
      const client: Client = new Client(this.abapSystem);
      await client.open();
      const functionName = 'ZCS_AUTORIZA_SP';
      const result = await client.call(functionName, {
        ACTION,
        IDWF: id,
        STEP: STEP.toString().padStart(2, '0'),
        USER: params?.user?.profile?.userSap || '',
        OBJECT: params?.user?.profile?.object || '',
      });
      await client.close();
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new Error('Not implemented');
  }

  async remove(id: NullableId, params?: Params): Promise<Data> {
    throw new Error('Not implemented');
  }
}
