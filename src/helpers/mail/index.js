const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENGRID_API_KEY);

module.exports = {
  sendMail: async (email, data) => {
    const msg = {
      from: process.env.EMAIL_SENDER_VERIFIED,
      to: email,
      template_id: process.env.VERIFY_DEVICE_TEMPLATE_ID,
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
    return `${process.env.API_BASE_URL}/auth/verify-account?token=${token}`
  }
}