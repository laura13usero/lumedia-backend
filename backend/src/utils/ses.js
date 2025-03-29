// Importación de SES del SDK v3
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// Configura el cliente SES con las credenciales
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Función para enviar el correo de confirmación
exports.enviarCorreoConfirmacion = async (email, token) => {
  const link = `http://localhost:3000/api/auth/confirmar/${token}`;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: 'Confirma tu cuenta en Lumedia',
      },
      Body: {
        Text: {
          Data: `Haz clic aquí para confirmar tu cuenta: ${link}`,
        },
      },
    },
    Source: process.env.SES_EMAIL_FROM,
  };

  const command = new SendEmailCommand(params);

  try {
    await sesClient.send(command); // Enviar el correo
    console.log('Correo enviado con éxito');
  } catch (err) {
    console.error('Error al enviar el correo: ', err);
  }
};
