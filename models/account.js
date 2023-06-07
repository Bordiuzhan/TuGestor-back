const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const accountSchema = new Schema(
  {
    name: {
      type: String,
    },
    date: {
      type: String,
    },
    year: {
      type: String,
    },
    number: {
      type: Number,
      // required: true,
    },
    addres: {
      type: String,
    },
    postal: {
      type: String,
    },
    dni: {
      type: String,
    },
    email: {
      type: String,
    },
    tel: {
      type: String,
    },
    tableData: {
      type: Array,
    },
    subtotal: {
      type: Number,
    },
    iva: {
      type: Number,
    },
    total: {
      type: Number,
    },
    aparat: {
      type: String,
    },
    model: {
      type: String,
    },
    brand: {
      type: String,
    },
    serie: {
      type: String,
    },
    mano: {
      type: String,
    },
    material: {
      type: String,
    },
    signatureFirst: {
      type: String,
    },
    signatureSecond: {
      type: String,
    },
    signatureThird: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    // factura: {
    //   id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Factura',
    //   },
    //   number: {
    //     type: Number,
    //   },
    //   date: { type: String },
    //   year: { type: String },
    // },
  },
  { versionKey: false, timestamps: true }
);

accountSchema.post('save',handleMongooseError);

const createSchema = Joi.object({
    // добавити валідації Joi схема//
});

const updateSchema = Joi.object({
      // добавити валідації Joi схема//
});

const schemas = {
  createSchema,
  updateSchema,
};

const Account=model("account",accountSchema);

module.exports={
    Account,
    schemas,
}