import { DynamoDBStreamEvent } from "aws-lambda"
import { message } from '../src/message'

export async function main(event: DynamoDBStreamEvent) {

    const record = event.Records[0]

    if(!record.eventName) {
        return 
    }

    if(record.eventName === 'INSERT') {
        const email = record.dynamodb?.NewImage?.email.S

        if(!email) {
            return 
        }

        const input = {
            recipient: email, 
            method: record.eventName
        }

        return await message(input)
    }

    else if(record.eventName === 'REMOVE') {
        const email = record.dynamodb?.OldImage?.email.S

        if(!email) {
            return 
        }

        const input = {
            recipient: email, 
            method: record.eventName
        }

        return await message(input)
    }

}