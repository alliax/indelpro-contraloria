// Initializes the `activo/tipoActivos` service on path `/activo/tipo-activos`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { TipoActivos } from './tipo-activos.class';
import createModel from '../../../models/tipo-activos.model';
import hooks from './tipo-activos.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'activo/tipo-activos': TipoActivos & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    app.get('path') + 'activo/tipo-activos',
    new TipoActivos(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'activo/tipo-activos') as 'activo/tipo-activos'
  );

  service.hooks(hooks);
}
