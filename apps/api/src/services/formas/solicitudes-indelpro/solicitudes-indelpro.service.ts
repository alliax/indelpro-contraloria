// Initializes the `formas/solicitudes-indelpro` service on path `/formas/solicitudes-indelpro`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { SolicitudesIndelpro } from './solicitudes-indelpro.class';
import hooks from './solicitudes-indelpro.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'formas/solicitudes-indelpro': SolicitudesIndelpro & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    app.get('path') + 'formas/solicitudes-indelpro',
    new SolicitudesIndelpro(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service(app.get('path') + 'formas/solicitudes-indelpro');

  service.hooks(hooks);
}
