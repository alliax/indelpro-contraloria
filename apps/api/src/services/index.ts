import { Application } from '../declarations';
// Don't remove this comment. It's needed to format import lines nicely.
import {
  MailerService,
  AuthManagementService,
  UploadsService,
  UsersService
} from '@alliax/feathers-server';
import expedientes from './activo/expedientes/expedientes.service';
import ajustes from './ajustes/ajustes.service';
import sapSettings from './activo/sap-settings/sap-settings.service';
import expedientesSap from './activo/expedientes-sap/expedientes-sap.service';
import formasSolicitudes from './formas-solicitudes/formas-solicitudes.service';
import formasTipos from './formas-tipos/formas-tipos.service';
import formasDocumentos from './formas-documentos/formas-documentos.service';
import activoTipoActivos from './activo/tipo-activos/tipo-activos.service';
import activos from './activo/activos/activos.service';
import activosSap from './activo/activos-sap/activos-sap.service';
export default function(app: Application) {
  app.configure(UsersService);
  app.configure(MailerService);
  app.configure(UploadsService);
  app.configure(AuthManagementService);
  app.configure(expedientes);
  app.configure(ajustes);
  app.configure(sapSettings);
  app.configure(expedientesSap);
  app.configure(formasSolicitudes);
  app.configure(formasTipos);
  app.configure(formasDocumentos);
  app.configure(activoTipoActivos);
  app.configure(activos);
  app.configure(activosSap);
}