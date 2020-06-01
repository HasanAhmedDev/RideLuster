const nodemailer = require('nodemailer');
const config = require('config');
const sendEmail = async (options) => {
  
  const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user: `${config.get('FROM_EMAIL')}`,
          pass:`${config.get('EMAIL_PASSWORD')}`
      }
  });

  let message = {
    from: `${config.get('FROM_EMAIL')}`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
};
module.exports = sendEmail;
