import { SESClient } from '@aws-sdk/client-ses'
import { createSendEmailCommand } from '../../../lib/EmailCommand'


interface Message {
  title: string
  body: string
}

const sesClient = new SESClient({ region: "us-east-1" })

export async function main(recipient: string, message: Message) {
    const sender = "lawtonharry77@gmail.com"

    if (!recipient.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: true }),
      }
    }
  
    try {
        const sendEmailCommand = createSendEmailCommand(
            recipient,
            sender,
            message
        )
        await sesClient.send(sendEmailCommand)

        return {
          statusCode: 200,
          body: JSON.stringify({ 
            message: "email sent successfully", 
            sender: sender, 
            recipient: recipient,  
          })
        }
    } 
    catch (error) {
      let message: string
      
      if (error instanceof Error) {
        message = error.message
      } 
      else {
        message = String(error)
      }

      return {
        statusCode: 500,
        body: JSON.stringify({ error: message }),
      }
    }
}


