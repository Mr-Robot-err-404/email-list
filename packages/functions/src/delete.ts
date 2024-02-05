import { Table } from "sst/node/table"
import handler from "@mailing-list/core/handler"
import dynamoDb from "@mailing-list/core/dynamodb"

export const main = handler(async (event) => {
    
  const params = {
    TableName: Table.Emails.tableName,
    Key: {
      userId: event.pathParameters?.id
    },
  }

  await dynamoDb.delete(params)

  return JSON.stringify({ status: true })
})