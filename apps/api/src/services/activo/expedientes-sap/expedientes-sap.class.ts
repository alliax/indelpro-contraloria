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
  HEADER?: any;
  DET?: any;
  ACT_REL?: any;
}

interface ServiceOptions {}

export class ExpedientesSap implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

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
      const registros = WBS_RESULT.TWBS as any[];
      await client.close();

      const pendientesCrear: any = [];

      for (let i = 0; i < registros.length; i++) {
        const registro = registros[i];
        registro.sapId = sapActivo[0]._id;
        try {
          const fecha = new Date(
            registro.AKTIV.substring(0, 4) +
              '-' +
              registro.AKTIV.substring(4, 6) +
              '-' +
              registro.AKTIV.substring(6, 8)
          );
          registro.AKTIV = fecha.toISOString();
        } catch (err) {
          delete registro.AKTIV;
        }
        const existe = await this.app
          .service((this.app.get('path') + 'expedientes') as 'expedientes')
          .find({
            query: {
              PROJK: registro.PROJK,
              sapId: sapActivo[0]._id,
            },
            paginate: false,
          });
        if (Array.isArray(existe) && existe.length === 0) {
          pendientesCrear.push(registro);
        } else {
          try {
            await this.app
              .service((this.app.get('path') + 'expedientes') as 'expedientes')
              .patch(existe[0]._id, registro);
          } catch (err) {}
        }
      }

      try {
        await this.app
          .service((this.app.get('path') + 'expedientes') as 'expedientes')
          .create(pendientesCrear);
      } catch (err) {}

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
      const actualizado = await this.app
        .service((this.app.get('path') + 'expedientes') as 'expedientes')
        .patch(id, {
          HEADER: response.HEADER,
          DET: response.DET,
          ACT_REL: response.ACT_REL,
        });
      return actualizado;
    } catch (err) {
      console.log(err);
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
