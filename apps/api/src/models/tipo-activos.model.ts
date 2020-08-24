// activo/tipoActivos-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { DeletedPropertiesModel } from '@alliax/feathers-server';

export default function (app: Application) {
  const modelName = 'tipoActivos';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      nombre: { type: String, required: true },
      imagen: { type: String },
      claveSap: { type: String, required: true },
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
