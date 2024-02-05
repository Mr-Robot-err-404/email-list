import AWS from "aws-sdk"
import { Queue } from "sst/node/queue"
import { map } from '../../../lib/map'

interface Props {
  recipient: string
  method: "INSERT" | "MODIFY" | "REMOVE"
}

const sqs = new AWS.SQS()

export async function message({ recipient, method }: Props) {
  const message = map[method]

  try {
    await sqs
    .sendMessage({
      QueueUrl: Queue.Queue.queueUrl,
      MessageBody: JSON.stringify({ 
          recipient: recipient, 
          message: message
       }),
    })
    .promise()

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "successful" }),
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