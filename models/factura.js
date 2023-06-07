import mongoose, { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers';
import Joi from 'joi';

const facturaScheme = new Schema({
  name: { type: String },
  date: { type: String, required: true },
  year: {},
  number: { type: Number,required:true},
  address: { type: String,},
  postal: { type: String,},
  dni: { type: String,},
  email: { type: String,},
  tel: { type: String,},
  tableData: { type: Array,},
  subtotal: { type: Number,},
  iva: { type: Number,},
  total: { type: Number,},
  aparat: { type: String },
  model: { type: String },
  brand: { type: String },
  serie: { type: String },
  mano: { type: String },
  material: { type: String },
  signatureFirst: { type: String },
  signatureSecond: { type: String },
  signatureThird: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
},{
    versionKey:false,timestamps:true
});

facturaScheme.post("save",handleMongooseError);

const updateSchema=Joi.object({
   // добавити валідації Joi схема//
});

const schemas={
    updateSchema,
};

const Factura=model("factura",facturaScheme);

module.exports={
    Factura,
    schemas
}