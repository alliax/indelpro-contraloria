// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.
import { softDelete } from 'feathers-hooks-common';
export default {
  before: {
    all: [
      softDelete({
        removeData: async (context) => {
          return {
            deleted: true,
            deletedAt: new Date(),
            deletedBy: context?.params?.user?._id || null,
          };
        },
      }),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
