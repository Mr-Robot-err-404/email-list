import { SQSEvent } from "aws-lambda"
import { SESClient } from '@aws-sdk/client-ses'
import { createSendEmailCommand } from "../../../lib/EmailCommand"
import * as dotenv from 'dotenv'

dotenv.config()

const sesClient = new SESClient({ region: "us-east-1" })

export async function main(event: SQSEvent) {
  const records = event.Records[0]
  const sender = process.env.EMAIL as string
    
  const data = JSON.parse(records.body)

  const sendEmailCommand = createSendEmailCommand(
    data.recipient,
    sender,
    data.message
  )
  await sesClient.send(sendEmailCommand)
}