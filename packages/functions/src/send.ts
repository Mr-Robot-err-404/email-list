import { SQSEvent } from "aws-lambda"
import { SESClient } from '@aws-sdk/client-ses'
import { createSendEmailCommand } from "../../../lib/EmailCommand"

const sesClient = new SESClient({ region: "us-east-1" })

export async function main(event: SQSEvent) {
  const records = event.Records[0]
  const sender = "lawtonharry77@gmail.com"
    
  const data = JSON.parse(records.body)

  const sendEmailCommand = createSendEmailCommand(
    data.recipient,
    sender,
    data.message
  )
  await sesClient.send(sendEmailCommand)
}