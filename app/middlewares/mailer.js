const nodemailer = require('nodemailer');
const config = require('../config/auth.config');

function send(message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.maileruser,
        pass: config.mailerpassword
      }
    })

    transporter.sendMail(message, function(err, info) {
      if (err) {
        rej(err)
      } else {
        res(info)
      }
    })
  })
}

exports.sendEmail = ({toUser, resetlink}) => {
  const message = {
    from: config.maileruser,
    to: toUser.email,
    subject: 'Zoo App - Reset Password',
    html:
      `
      <h3>Hi ${toUser.username} </h3>
      <p>To reset your password please follow this link: <a target="_" href="${resetlink}">Reset Password Link</a></p>
      <p>Regards,</p>
      <p>ZooApp Team</p>
      `
  }

  return send(message);
}