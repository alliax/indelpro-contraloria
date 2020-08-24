import { fastJoin } from 'feathers-hooks-common';

const postResolvers = {
  joins: {
    fotos: () => async (expediente: any, context: any) => {
      expediente.fotos = await context.app
        .service(context.app.get('path') + 'activo/adjuntos')
        .find({
          query: {
            _id: {
              $in: expediente.fotosId,
            },
          },
        });
    },
    autorizacionProyectos: () => async (expediente: any, context: any) => {
      expediente.autorizacionProyectos = await context.app
        .service(context.app.get('path') + 'activo/adjuntos')
        .find({
          query: {
            _id: {
              $in: expediente.autorizacionProyectosId,
            },
          },
        });
    },
    capitalizacionProyectos: () => async (expediente: any, context: any) => {
      expediente.capitalizacionProyectos = await context.app
        .service(context.app.get('path') + 'activo/adjuntos')
        .find({
          query: {
            _id: {
              $in: expediente.capitalizacionProyectosId,
            },
          },
        });
    },
    ubicacion: () => async (expediente: any, context: any) => {
      expediente.ubicacion = expediente.ubicacionId
        ? await context.app
            .service(context.app.get('path') + 'activo/ubicaciones')
            .get(expediente.ubicacionId)
        : null;
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
