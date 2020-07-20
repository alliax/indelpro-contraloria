// activos-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'activos';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      ANLN1: { type: String }, //   -  Activo
      TXT50: { type: String }, //    -  Texto 1 de activo
      TXA50: { type: String }, //   -  Texto 2 del activo
      AKTIV: { type: Date }, //    -  Fecha de Capitalización
      GJAHR_CAPI: { type: Number }, //  -  Año de Capitalización
      ANLKL: { type: Number }, //   -  Tipo de Activo
      TPOACT: { type: String }, //  -  Descripción del tipo de Activo
      POSNR: { type: String }, // -  Elemento PEP o SAI
      KANSW: { type: Number }, //-  Valor de adquisición.  (Longitud 13 más 2 decimales)
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
