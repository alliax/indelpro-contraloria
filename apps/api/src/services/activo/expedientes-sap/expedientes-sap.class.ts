import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Client, RfcConnectionParameters } from 'node-rfc';
import { NotImplemented } from '@feathersjs/errors';
import { SapSettings } from '../sap-settings/sap-settings.class';

interface Data {
  PROJK: string;
  NAME1: string;
  ANLN1: string;
  TXT50: string;
  AKTIV: string | Date;
  GJAHR_CAPI: number;
  ANLKL: string;
  TPOACT: string;
  sapId: string;
}

interface ServiceOptions {}

export class ExpedientesSap implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;
  /*abapSystem: RfcConnectionParameters = {
    user: 'prgr05',
    passwd: 'Passindqas#19',
    ashost: '10.241.0.9',
    client: '100',
    sysid: 'DES',
    sysnr: '00',
    lang: 'es',
  };*/
  /*abapSystem: RfcConnectionParameters = {
    user: 'EFRFC005',
    passwd: 'EFMOVIL1',
    client: '100',
    sysnr: '00',
    ashost: '10.128.160.49',
    lang: 'en',
  };*/

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    try {
      const sapActivo: SapSettings[] = (await this.app
        .service((this.app.get('path') + 'sap-settings') as 'sap-settings')
        .find({
          query: {
            activo: true,
          },
          paginate: false,
        })) as SapSettings[];

      const client: Client = new Client(sapActivo[0]);
      await client.open();
      const functionName = 'ZCS_EXTRACT_WBS_2';
      const WBS_RESULT = await client.call(functionName, {
        P_BUKRS: 'IN10',
      });
      const registros = WBS_RESULT.TWBS as Data[];
      await client.close();

      for (let i = 0; i < registros.length; i++) {
        const registro = registros[i];
        try {
          if (typeof registro.AKTIV === 'string') {
            registro.AKTIV = new Date(
              registro.AKTIV.substring(0, 4) +
                '-' +
                registro.AKTIV.substring(4, 6) +
                '-' +
                registro.AKTIV.substring(6, 8)
            );
          }
        } catch (err) {
          delete registro.AKTIV;
        }

        await this.app
          .service((this.app.get('path') + 'expedientes') as 'expedientes')
          .find({
            query: {
              PROJK: registro.PROJK,
              sapId: sapActivo[0]._id,
            },
            paginate: false,
          })
          .then((existe: any) => {
            registro.sapId = sapActivo[0]._id;
            if (Array.isArray(existe) && existe.length === 0) {
              this.app
                .service(
                  (this.app.get('path') + 'expedientes') as 'expedientes'
                )
                .create(registro);
            } else {
              const encontrado: any = Array.isArray(existe) ? existe[0] : null;
              this.app
                .service(
                  (this.app.get('path') + 'expedientes') as 'expedientes'
                )
                .patch(encontrado._id, registro);
            }
          });
      }
      return registros;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  async get(id: Id, params?: Params): Promise<Data> {
    try {
      const sapActivo: SapSettings[] = (await this.app
        .service((this.app.get('path') + 'sap-settings') as 'sap-settings')
        .find({
          query: {
            activo: true,
          },
          paginate: false,
        })) as SapSettings[];
      const registro = await this.app
        .service((this.app.get('path') + 'expedientes') as 'expedientes')
        .get(id);
      const client: Client = new Client(sapActivo[0]);
      await client.open();
      const functionName = 'ZCS_INF_SAI_AF';
      const response = await client.call(functionName, {
        POSID: registro.PROJK,
      });
      await this.app
        .service((this.app.get('path') + 'expedientes') as 'expedientes')
        .patch(id, {
          HEADER: response.HEADER,
          DET: response.DET,
        });
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }

  async create(data: Data, params?: Params): Promise<Data> {
    throw new NotImplemented('Method Not Implemented');
  }

  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new NotImplemented('Method Not Implemented');
  }

  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new NotImplemented('Method Not Implemented');
  }

  async remove(id: NullableId, params?: Params): Promise<Data> {
    throw new NotImplemented('Method Not Implemented');
  }
}
