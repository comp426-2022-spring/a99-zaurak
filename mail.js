const nodemailer = require('nodemailer'); 
const { getMaxListeners } = require('process');

const ConfigureMailer = () => {
    const transporter = nodemailer.createTransport({
        host: "stmp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "zaurakapp@getMaxListeners.com",
            password: "ResetPassword2022",
        }
    })
    return transporter; 
}

module.exports = ConfigureMailer()