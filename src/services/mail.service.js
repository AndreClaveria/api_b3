// const nodemailer = require("nodemailer");

// function SendMailTo(userTo, sentTo) {

//     let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
 
//     auth: {
//         user: 'demo.12345121@gmail.com', 
//         pass: 'zhrqbikaolfmsmat'
//     },
//     });

// //   
//     let info = transporter.sendMail({
//     from: '"Lanceur de liberté" <demo.12345121@gmail.com>', 
//     to: "'" + userTo + "'" + "<" + sentTo + ">", 
//     subject: "Hello ✔", 
//     text: "Hello world?", 
//     html: "<b>Hello world?</b>", 
//     });

//     console.log("Message sent: %s", info.messageId);
// }

// module.exports = {
//     SendMailTo
// }