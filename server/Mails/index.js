const mailCreds = require('./credentials');

let mailStatus;

const sendVerificationOTP = async (from, to, msgBody, subject) => {
    try {

        mailStatus = await mailCreds.connect();
        console.log(typeof mailStatus);
        mailStatus = await mailStatus.sendMail({
            from: `Expense Management APP ${from}`,
            to: to,
            subject: subject,
            text: `${msgBody}`
        });

        return mailStatus.messageId;

    } catch (error) {
        console.log(`Error occured inside sendVerificationOTP method\n${error}`);
    }
}

module.exports = { sendVerificationOTP };