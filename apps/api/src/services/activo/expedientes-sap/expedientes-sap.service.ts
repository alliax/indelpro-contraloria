// Initializes the `expedientes-sap` service on path `/expedientes-sap`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { ExpedientesSap } from './expedientes-sap.class';
import hooks from './expedientes-sap.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'expedientes-sap': ExpedientesSap & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    app.get('path') + 'expedientes-sap',
    new ExpedientesSap(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'expedientes-sap') as 'expedientes-sap'
  );

  service.hooks(hooks);
}
