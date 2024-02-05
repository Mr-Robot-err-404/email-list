import { SendEmailCommand } from "@aws-sdk/client-ses"

interface Message {
  title: string
  body: string
}

export const createSendEmailCommand = (toAddress: string, fromAddress: string, message: Message) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [
        toAddress
      ],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: message.body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: message.title,
      },
    },
    Source: fromAddress,
  })
}
