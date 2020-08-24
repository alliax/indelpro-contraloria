import * as local from '@feathersjs/authentication-local';
const { protect } = local.hooks;

const revisaActivo = async (context: any) => {
  if (context.data.activo === true) {
    await context.app
      .service(context.app.get('path') + 'sap-settings')
      .patch(null, { activo: false });
  }
  return context;
};

//todo(roth): Add default hook to set activo true on first item
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [revisaActivo],
    patch: [revisaActivo],
    remove: [],
  },

  after: {
    all: [protect('passwd')],
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
