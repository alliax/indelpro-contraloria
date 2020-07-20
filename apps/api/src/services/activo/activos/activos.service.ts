// Initializes the `activos` service on path `/activos`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Activos } from './activos.class';
import createModel from '../../../models/activos.model';
import hooks from './activos.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    activos: Activos & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    (app.get('path') + 'activos') as 'activos',
    new Activos(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service((app.get('path') + 'activos') as 'activos');

  service.hooks(hooks);
}
