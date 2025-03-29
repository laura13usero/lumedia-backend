// Importación de SES del SDK v3
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const AWS = require('aws-sdk');

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
  /*const link = `http://3.88.175.169:3000/api/auth/confirmar/${token}`;

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
    Source: process.env.SES_EMAIL_FROM,*/


    

    // Configura la región (si no lo tienes configurado globalmente)
    AWS.config.update({ region: 'us-east-1' }); // Cambia la región según tu configuración
    
    // Crea el objeto Lambda
    const lambda = new AWS.Lambda();
    
    const params = {
      FunctionName: 'emailconfirmacion', // Reemplaza con el nombre de tu Lambda
      //Payload: JSON.stringify({ key: 'value' }), // Los parámetros que tu Lambda espera
    };
    
    lambda.invoke(params, (err, data) => {
      if (err) {
        console.error('Error al invocar la Lambda:', err);
      } else {
        console.log('Respuesta de la Lambda:', JSON.parse(data.Payload));
      }
    });






  };

  const command = new SendEmailCommand(params);

  try {
    await sesClient.send(command); // Enviar el correo
    console.log('Correo enviado con éxito');
  } catch (err) {
    console.error('Error al enviar el correo: ', err);
  }

