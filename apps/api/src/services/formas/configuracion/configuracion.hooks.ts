import { iff, isProvider } from 'feathers-hooks-common';
import { hooks } from '@feathersjs/authentication';

export default {
  before: {
    all: [hooks.authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [
      iff(isProvider('external'), async (context: any) => {
        try {
          if (context.data.activo === true) {
            await context.app
              .service(context.app.get('path') + 'formas/configuracion')
              .patch(null, { activo: false });
          }
        } catch (err) {
          console.log(err);
        }
        return context;
      }),
    ],
    patch: [
      iff(isProvider('external'), async (context: any) => {
        try {
          if (context.data.activo === true) {
            await context.app
              .service(context.app.get('path') + 'formas/configuracion')
              .patch(null, { activo: false });
          }
        } catch (err) {
          console.log(err);
        }
        return context;
      }),
    ],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
