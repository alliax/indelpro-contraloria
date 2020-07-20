// expedientes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';

export default function (app: Application) {
  const modelName = 'expedientes';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      // PROJK: 'E/0101',
      // NAME1: 'New Power Feed the Firewater Pump House',
      // ANLN1: '000201002427',
      // TXT50: 'BOMBA AGUA CONTRA INCENDIO MCA F MORSEMOD 10X12 P',
      // AKTIV: '20111231',
      // GJAHR_CAPI: '2011',
      // ANLKL: '00002010',
      // TPOACT: '2010 Machines'

      PROJK: { type: String },
      NAME1: { type: String },
      ANLN1: { type: String },
      TXT50: { type: String },
      AKTIV: { type: Date },
      GJAHR_CAPI: { type: Number },
      ANLKL: { type: String },
      TPOACT: { type: String },

      // nombre: { type: String, required: true },
      // tipo: { type: String },
      // numeroActivo: { type: String },
      // numeroActivoRelacionado: { type: String },
      // numeroTag: { type: String },
      // numeroSAI: { type: String },
      // fechaCapitalizacion: { type: Date },
      // montoCapitalizado: { type: Number },
      // moneda: { type: String }
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
