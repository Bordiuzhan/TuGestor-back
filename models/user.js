const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    '*': 'missing required field email',
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.valid('starter', 'pro', 'business').required(),
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
