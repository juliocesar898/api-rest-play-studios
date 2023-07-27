const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENGRID_API_KEY);

module.exports = {
  sendMail: async (email, template, data) => {
    const msg = {
      from: process.env.EMAIL_SENDER_VERIFIED,
      to: email,
      template_id: template,
      dynamic_template_data: {
        data
      },
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    } 
  },
  generateLinkVerification: (token) => {
    return `${process.env.WEBSITE_URL}/auth/verify-account?token=${token}`
  },
  generateLinkRecoveryPassword: (token) => {
    return `${process.env.WEBSITE_URL}/auth/forgot-password?token=${token}`
  },
}