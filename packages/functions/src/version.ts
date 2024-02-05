import * as uuid from "uuid"
import { Table } from "sst/node/table"
import handler from "@mailing-list/core/handler"
import dynamoDb from "@mailing-list/core/dynamodb"

export const main = handler(async (event) => {
  let data = {
    content: "",
  }

  if (event.body != null) {
    data = JSON.parse(event.body)
  }

  const params = {
    TableName: Table.VersionHistory.tableName,
    Item: {
      id: uuid.v1(), 
      version: data.content, 
      releaseDate: Date.now(), 
    },
  }

  await dynamoDb.put(params)

  return JSON.stringify(params.Item)
})