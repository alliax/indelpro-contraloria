// Initializes the `activo/grupo-ubicaciones` service on path `/activo/grupo-ubicaciones`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { GrupoUbicaciones } from './grupo-ubicaciones.class';
import createModel from '../../../models/grupo-ubicaciones.model';
import hooks from './grupo-ubicaciones.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'activo/grupo-ubicaciones': GrupoUbicaciones & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    app.get('path') + 'activo/grupo-ubicaciones',
    new GrupoUbicaciones(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'activo/grupo-ubicaciones') as 'activo/grupo-ubicaciones'
  );

  service.hooks(hooks);
}
