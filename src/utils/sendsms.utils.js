import Twilio from "twilio";

async function sendSms(phone) {
    try {
       const transport = Twilio(process.env.TWILIO_SID,process.env.TWILIO_TOKEN);
       transport.messages.create({
        body: "mensaje enviado desde la app",
        from: process.env.TWILIO_PHONE,
        to: phone,
       })
    } catch (error) {
        throw error;
    }
}

export default sendSms;