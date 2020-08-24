// activo/grupo-ubicaciones-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import { DeletedPropertiesModel } from '@alliax/feathers-server';

export default function (app: Application): Model<any> {
  const modelName = 'grupoUbicaciones';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      nombre: { type: String, required: true },
      activo: { type: Boolean, default: true },
      orden: { type: Number, default: 0 },
      ...DeletedPropertiesModel
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
