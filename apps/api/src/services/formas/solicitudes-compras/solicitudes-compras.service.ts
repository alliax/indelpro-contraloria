// Initializes the `formas/solicitudes-compras` service on path `/formas/solicitudes-compras`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { SolicitudesCompras } from './solicitudes-compras.class';
import hooks from './solicitudes-compras.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'formas/solicitudes-compras': SolicitudesCompras & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    app.get('path') + 'formas/solicitudes-compras',
    new SolicitudesCompras(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service(app.get('path') + 'formas/solicitudes-compras');

  service.hooks(hooks);
}
