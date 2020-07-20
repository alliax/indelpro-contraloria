// Initializes the `expedientes` service on path `/expedientes`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Expedientes } from './expedientes.class';
import createModel from '../../../models/expedientes.model';
import hooks from './expedientes.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    expedientes: Expedientes & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(app.get('path') + 'expedientes', new Expedientes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'expedientes') as 'expedientes'
  );

  service.hooks(hooks);
}
