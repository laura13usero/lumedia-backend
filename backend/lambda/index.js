const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

exports.handler = async (event) => {
  const { email, token } = JSON.parse(event.body);

  const params = {
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Subject: { Data: 'Confirma tu cuenta en Lumedia' },
      Body: {
        Html: {
          Data: `
            <h1>¡Bienvenido a Lumedia!</h1>
            <p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
            <a href="https://lumedia.com/confirmar?token=${token}">Confirmar cuenta</a>
          `
        }
      }
    },
    Source: process.env.SES_EMAIL_FROM // verificado en SES
  };

  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
