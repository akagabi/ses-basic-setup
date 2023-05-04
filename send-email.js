const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { fromIni } = require("@aws-sdk/credential-provider-ini");

const sesClient = new SESClient({
  region: "eu-west-1",
  credentials: fromIni(),
});

const sendEmail = async () => {
  const params = {
    Destination: {
      ToAddresses: ["replace-with-your-email-address@gmail.com"],
    },
    Message: {
      Body: {
        Text: {
          Data: "Hello, this is a test email from AWS SES.",
        },
      },
      Subject: {
        Data: "Test email",
      },
    },
    Source: '"Detail" <support@detail.co>',
  };

  try {
    const response = await sesClient.send(new SendEmailCommand(params));
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

sendEmail();
