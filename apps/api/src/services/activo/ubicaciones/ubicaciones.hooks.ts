import { fastJoin } from 'feathers-hooks-common';

const postResolvers = {
  joins: {
    grupoUbicacion: () => async (ubicacion: any, context: any) => {
      ubicacion.grupoUbicacion = await context.app
        .service(context.app.get('path') + 'activo/grupo-ubicaciones')
        .get(ubicacion.grupoUbicacionId);
    },
  },
};

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [fastJoin(postResolvers)],
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
