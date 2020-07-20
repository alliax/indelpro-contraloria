// Initializes the `formas-tipos` service on path `/formas-tipos`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FormasTipos } from './formas-tipos.class';
import createModel from '../../models/formas-tipos.model';
import hooks from './formas-tipos.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'formas-tipos': FormasTipos & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(app.get('path') + 'formas-tipos', new FormasTipos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'formas-tipos') as 'formas-tipos'
  );

  service.hooks(hooks);
}
