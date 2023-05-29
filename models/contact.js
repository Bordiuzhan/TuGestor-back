const { Schema, model, SchemaTypes } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const dateRegexp = /^\d{3}-\d{2}-\d{2}-\d{2}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: dateRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
      // 16-10-2009
      //  match:/^\d{2}-\d{2}-\d{4}$/;
      // enum:["fantastic", "love"];
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);
// обробка помилки при валідації даних // Додавання Middleware на схему!!! //
contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(dateRegexp).required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string().pattern(dateRegexp),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const schema = { addSchema, updateSchema, updateFavoriteSchema };
const Contact = model('contact', contactSchema);

module.exports = { Contact, schema };
