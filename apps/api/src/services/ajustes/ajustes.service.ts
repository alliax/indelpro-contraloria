// Initializes the `ajustes` service on path `/ajustes`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Ajustes } from './ajustes.class';
import createModel from '../../models/ajustes.model';
import hooks from './ajustes.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    ajustes: Ajustes & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(app.get('path') + 'ajustes', new Ajustes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service((app.get('path') + 'ajustes') as 'ajustes');

  service.hooks(hooks);
}
