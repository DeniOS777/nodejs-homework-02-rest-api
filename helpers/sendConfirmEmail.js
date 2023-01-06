const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendConfirmEmail = async data => {
  const email = { ...data, from: 'denios777@gmail.com' };
  try {
    await sgMail.send(email);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendConfirmEmail;
