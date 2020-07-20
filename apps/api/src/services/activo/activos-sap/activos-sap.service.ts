// Initializes the `activos-sap` service on path `/activos-sap`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { ActivosSap } from './activos-sap.class';
import hooks from './activos-sap.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'activos-sap': ActivosSap & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    (app.get('path') + 'activos-sap') as 'activos-sap',
    new ActivosSap(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'activos-sap') as 'activos-sap'
  );

  service.hooks(hooks);
}
