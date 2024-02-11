import * as uuid from "uuid"
import { Table } from "sst/node/table"
import handler from "@mailing-list/core/handler"
import dynamoDb from "@mailing-list/core/dynamodb"

export const main = handler(async (event) => {
  let data = {
    email: "",
    username: ""
  }

  if (event.body != null) {
    data = JSON.parse(event.body)
  }

  const params = {
    TableName: Table.Emails.tableName,
    Item: {
      userId: uuid.v1(), 
      email: data.email, 
      username: data.username,
      createdAt: Date.now(), 
    },
  }

  await dynamoDb.put(params)

  return JSON.stringify(params.Item)
})