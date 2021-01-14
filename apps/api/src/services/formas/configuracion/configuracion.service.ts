// Initializes the `formas/configuracion` service on path `/formas/configuracion`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Configuracion } from './configuracion.class';
import createModel from '../../../models/configuracion.model';
import hooks from './configuracion.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'formas/configuracion': Configuracion & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['patch', 'update'],
  };

  // Initialize our service with any options it requires
  app.use(
    app.get('path') + 'formas/configuracion',
    new Configuracion(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service(app.get('path') + 'formas/configuracion');

  service.hooks(hooks);
}
