// Initializes the `formas/sap` service on path `/formas/sap`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Sap } from './sap.class';
import createModel from '../../../models/sap.model';
import hooks from './sap.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'formas/sap': Sap & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(app.get('path') + 'formas/sap', new Sap(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(app.get('path') + 'formas/sap');

  service.hooks(hooks);
}
