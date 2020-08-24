// Initializes the `activo/ubicaciones` service on path `/activo/ubicaciones`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Ubicaciones } from './ubicaciones.class';
import createModel from '../../../models/ubicaciones.model';
import hooks from './ubicaciones.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'activo/ubicaciones': Ubicaciones & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    app.get('path') + 'activo/ubicaciones',
    new Ubicaciones(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'activo/ubicaciones') as 'activo/ubicaciones'
  );

  service.hooks(hooks);
}
