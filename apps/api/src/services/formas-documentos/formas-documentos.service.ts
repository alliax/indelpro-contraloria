// Initializes the `formas-documentos` service on path `/formas-documentos`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FormasDocumentos } from './formas-documentos.class';
import createModel from '../../models/formas-documentos.model';
import hooks from './formas-documentos.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'formas-documentos': FormasDocumentos & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    app.get('path') + 'formas-documentos',
    new FormasDocumentos(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'formas-documentos') as 'formas-documentos'
  );

  service.hooks(hooks);
}
