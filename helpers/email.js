import nodemailer from 'nodemailer';

let emailRegistro = async (datos) => {
    // Configura el transportador
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,    
        port: process.env.EMAIL_PORT,     
        auth: {   
          user: process.env.EMAIL_USER,     
          pass: process.env.EMAIL_PASS     
        }    
    });

    // Extrae los datos
    const { nombre, email, token } = datos;

    // Enviar email
    await transport.sendMail({
        from: 'Bienes Raices.com',
        to: email,
        subject: 'Confirma tu cuenta en Bienes _Raices.com',
        text: 'Confirma tu cuenta en Bienes _Raices.com',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en BienesRaices.com.</p>
            <p>Confirma tu cuenta en Bienes Raices, ya está lista. Solo debes confirmarla 
            en el siguiente enlace: 
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">
                Confirmar cuenta
            </a></p>
            <p>Si tú no creaste esta cuenta, ignora este mensaje.</p>
        `
    });
};

export { emailRegistro };
