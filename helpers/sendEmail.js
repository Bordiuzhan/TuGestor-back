const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: 'bordyujan@gmail.com' };
  await sgMail.send(email);
  return true;
};
module.exports = sendEmail;

// --------приклад конфігураціі email---------//
// const email = {
//   to: 'kinedav149@huvacliq.com',
//   from: 'bogdan.lyamzin.d@gmail.com',
//   subject: 'Test email',
//   html: '<p><strong>Test email</strong> from localhost:3000</p>',
// };

// sgMail
//   .send(email)
//   .then(() => console.log('Email send success'))
//   .catch((error) => console.log(error.message));

// --------- відправка email  через nodemailer (meta.ua)--------//

// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: 'smtp.meta.ua',
//   port: 465, //25, 465, 2525
//   secure: true,
//   auth: {
//     user: 'bogdan.lyamzin.d@meta.ua',
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: 'kinedav149@huvacliq.com',
//   from: 'bogdan.lyamzin.d@meta.ua',
//   subject: 'Test email',
//   html: '<p><strong>Test email</strong> from localhost:3000</p>',
// };

// transport
//   .sendMail(email)
//   .then(() => console.log('Email send success'))
//   .catch((error) => console.log(error.message));
