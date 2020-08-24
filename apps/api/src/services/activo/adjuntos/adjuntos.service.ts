// Initializes the `activo/adjuntos` service on path `/activo/adjuntos`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Adjuntos } from './adjuntos.class';
import createModel from '../../../models/adjuntos.model';
import hooks from './adjuntos.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'activo/adjuntos': Adjuntos & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(app.get('path') + 'activo/adjuntos', new Adjuntos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'activo/adjuntos') as 'activo/adjuntos'
  );

  service.hooks(hooks);
}
