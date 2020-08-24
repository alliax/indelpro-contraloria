// expedientes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import mongoose from 'mongoose';
import { DeletedPropertiesModel } from '@alliax/feathers-server';

export default function (app: Application) {
  const modelName = 'expedientes';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      PROJK: { type: String },
      NAME1: { type: String },
      ANLN1: { type: String },
      TXT50: { type: String },
      AKTIV: { type: Date },
      GJAHR_CAPI: { type: Number },
      ANLKL: { type: String },
      TPOACT: { type: String },
      sapId: { type: mongoose.SchemaTypes.ObjectId, ref: 'sapSettings' },
      ...DeletedPropertiesModel,
      HEADER: {
        AKTIV: { type: String },
        ANLKL: { type: String },
        ANLN1: { type: String },
        ANLN2: { type: String },
        GJAHR_CAPI: { type: Number },
        MONTO_CAPIT: { type: Number },
        POSID: { type: String },
        POST1: { type: String },
        PPTO_USD: { type: Number },
        REAL_USD: { type: Number },
        SERNR: { type: String },
        TPOACT: { type: String },
      },
      DET: [
        {
          AUGDT: { type: String },
          BELNR: { type: String },
          BUDAT: { type: String },
          DMBE2: { type: Number },
          DMBT1: { type: Number },
          EBELN: { type: String },
          EBELP: { type: String },
          KZKRS: { type: Number }, // tipo de cambio
          LIFNR: { type: String },
          NAME1: { type: String },
          PAIS: { type: String },
          PEDIMENTO: { type: String },
          SGTXT: { type: String },
          SHKZG: { type: String },
          WAERS: { type: String },
          WRBT1: { type: Number },
          ZADUANA: { type: String },
          ZFCHPAGO: { type: String },
          ZPATENTE: { type: String },
          ZPEDIMENTO: { type: String },
          ZUONR: { type: String },
        },
      ],
      fotosId: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'activo/adjuntos',
        },
      ],
      autorizacionProyectosId: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'activo/adjuntos',
        },
      ],
      capitalizacionProyectosId: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'activo/adjuntos',
        },
      ],
      ubicacionId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'activo/ubicaciones',
      },
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
