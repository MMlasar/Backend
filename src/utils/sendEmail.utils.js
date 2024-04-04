import { createTransport } from "nodemailer";

async function sendEmail(data) {
    try {
        const transport = createTransport({
            service: "gmail",
            port: process.env.PORT,
            auth: { user: process.env.GOOGLE_EMAIL, pass: process.env.GOOGLE_PASSWORD }
        });
        await transport.sendMail({
            from: `CODER <${process.env.G_MAIL}>`,
            to: data.email,
            subject: `¡USUARIO ${data.name.toUpperCase()} REGISTRADO!`,
            html: "<h1>¡USUARIO REGISTRADO!<h1>",
        });
    } catch (error) {
        throw error;
    }
}

export default sendEmail;
