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
  ANLN1: string;
  TXT50: string;
  TXA50: string;
  AKTIV: string | Date;
  GJAHR_CAPI: number;
  ANLKL: number;
  TPOACT: string;
  POSNR: string;
  KANSW: number;
  sapId: string;
}

interface ServiceOptions {}

export class ActivosSap implements ServiceMethods<Data> {
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
      const functionName = 'ZCS_EXTRACT_ACTIVO';
      const WBS_RESULT = await client.call(functionName, {
        P_BUKRS: 'IN10',
      });
      const registros = <any[]>WBS_RESULT.TANLA;
      await client.close();
      await this.app
        .service((this.app.get('path') + 'activos') as 'activos')
        ._remove(null, {
          disableSoftDelete: true,
          sapId: sapActivo[0]._id,
        });
      const registrosEditados = registros.map((registro) => {
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
        return registro;
      });
      await this.app
        .service((this.app.get('path') + 'activos') as 'activos')
        ._create(registrosEditados);

      return registrosEditados;

      /*const expedientes = (
        await this.app
          .service((this.app.get('path') + 'expedientes') as 'expedientes')
          .find({})
      ).filter(
        (registro: any) =>
          !registro.PROJK.includes('-') && registro.PROJK.includes('E/')
      );*/
      /*for (let i = 0; i < registros.length; i++) {
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
        const creado = await this.app
          .service((this.app.get('path') + 'activos') as 'activos')
          .create(registro);
        creados.push(creado);
      }

      return creados;*/
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  async get(id: Id, params?: Params): Promise<Data> {
    throw new NotImplemented('Method Not Implemented');
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
