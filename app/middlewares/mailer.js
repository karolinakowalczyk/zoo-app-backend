const nodemailer = require('nodemailer');


function send(message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zooapplication0@gmail.com',
        pass: 'Z@@app1999'
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
    from: 'zooapplication0@gmail.com',
    to: toUser.email,
    //to: 'zooapplication0@gmail.com',
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