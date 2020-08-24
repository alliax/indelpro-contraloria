// sap-settings-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { DeletedPropertiesModel } from '@alliax/feathers-server';

export default function (app: Application) {
  const modelName = 'sapSettings';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      nombre: { type: String, required: true },

      ashost: { type: String, required: true },
      sysid: { type: String, required: true },
      sysnr: { type: String, required: true },
      client: { type: String, required: true },
      user: { type: String, required: true },
      passwd: { type: String, required: true },
      lang: { type: String, required: true },

      activo: { type: Boolean, required: true, default: false },
      P_BUKRS: { type: String, required: true },
      ...DeletedPropertiesModel
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
}
