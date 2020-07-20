// Initializes the `sap-settings` service on path `/sap-settings`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { SapSettings } from './sap-settings.class';
import createModel from '../../../models/sap-settings.model';
import hooks from './sap-settings.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'sap-settings': SapSettings & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(app.get('path') + 'sap-settings', new SapSettings(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(
    (app.get('path') + 'sap-settings') as 'sap-settings'
  );

  service.hooks(hooks);
}
