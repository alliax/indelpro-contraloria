import { Application } from '../declarations';
// Don't remove this comment. It's needed to format import lines nicely.
import {
  MailerService,
  AuthManagementService,
  UploadsService,
  UsersService,
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
import activoGrupoUbicaciones from './activo/grupo-ubicaciones/grupo-ubicaciones.service';
import activoUbicaciones from './activo/ubicaciones/ubicaciones.service';
import activoAdjuntos from './activo/adjuntos/adjuntos.service';
import formasSolicitudesIndelpro from './formas/solicitudes-indelpro/solicitudes-indelpro.service';
import formasSolicitudesCompras from './formas/solicitudes-compras/solicitudes-compras.service';
import formasSap from './formas/sap/sap.service';
import formasConfiguracion from './formas/configuracion/configuracion.service';
import { customNotifier } from './customNotifier';
export default function (app: Application) {
  app.configure(UsersService);
  app.configure(MailerService);
  app.configure(UploadsService);
  app.configure(() => AuthManagementService(app, customNotifier));

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
  app.configure(activoGrupoUbicaciones);
  app.configure(activoUbicaciones);
  app.configure(activoAdjuntos);
  app.configure(formasSolicitudesIndelpro);
  app.configure(formasSolicitudesCompras);
  app.configure(formasSap);
  app.configure(formasConfiguracion);
}
