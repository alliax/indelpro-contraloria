// Initializes the `formas-solicitudes` service on path `/formas-solicitudes`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FormasSolicitudes } from './formas-solicitudes.class';
import hooks from './formas-solicitudes.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'formas-solicitudes': FormasSolicitudes & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    app.get('path') + 'formas-solicitudes',
    new FormasSolicitudes(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'formas-solicitudes') as 'formas-solicitudes'
  );

  service.hooks(hooks);
}
