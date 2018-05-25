const Sendgrid = require('@sendgrid/mail');

module.exports = function () {
  return (context) => {
    const token = context.data.token;
    const email = context.data.email;

    Sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    Sendgrid.send({
      to: email,
      from: 'leejefon@gmail.com',
      subject: '[Leefamily] Reset Password',
      html: `
        Click <a href="https://localhost:3030/resetPassword/${token}">here</a> to reset your password
      `,
    });
  };
};
