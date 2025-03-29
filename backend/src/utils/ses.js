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
    const AWS = require('aws-sdk');

    AWS.config.update({ region: 'us-east-1' }); // Cambia a tu región de AWS

    const lambda = new AWS.Lambda();

    const params = {
      FunctionName: 'enviarEmailConfirmacion', // Reemplaza con el nombre exacto de tu Lambda
    };

    lambda.invoke(params, (err, data) => {
      if (err) {
        console.error('Error al invocar la Lambda:', err);
      } else {
        console.log('Respuesta de la Lambda:', JSON.parse(data.Payload));
      }
    });
  

 /* const command = new SendEmailCommand(params);

  try {
    await sesClient.send(command); // Enviar el correo
    console.log('Correo enviado con éxito');
  } catch (err) {
    console.error('Error al enviar el correo: ', err);
  }*/
};
