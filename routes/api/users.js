const express = require('express');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

const route = express.Router();

// signup
route.post('/register', validateBody(schemas.registerSchema), ctrl.register);

route.get('/verify/:verificationToken', ctrl.verifyEmail);

route.post(
  '/verify',
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

// signin
route.post('/login', validateBody(schemas.loginSchema), ctrl.login);

route.get('/current', authenticate, ctrl.getCurrent);

route.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

route.post('/logout', authenticate, ctrl.logout);

route.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

module.exports = route;
