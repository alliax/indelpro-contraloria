import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../../declarations';
import { RfcConnectionParameters } from 'node-rfc';

export interface SapSettings extends RfcConnectionParameters {
  _id: string;
  nombre: string;
  ashost: string;
  sysid: string;
  sysnr: string;
  client: string;
  user: string;
  passwd: string;
  lang: string;
  activo: boolean;
  P_BUKRS: string;
}
export class SapSettings extends Service {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
