import { StackContext, Table, use } from "sst/constructs"
import { QueueStack } from "./QueueStack"

export function StorageStack({ stack }: StackContext) {
  const { queue } = use(QueueStack)  

  const table = new Table(stack, "Emails", {
    fields: {
      userId: "string",
    },
    primaryIndex: { partitionKey: "userId" },
    stream: true,
    consumers: {
      consumer: {
        function: {
          handler: "packages/functions/src/stream.main", 
          bind: [queue]
        }
      }, 
    },
  })

  const version_history = new Table(stack, "VersionHistory", {
    fields: {
      id: "string",
      version: "string",
      releaseDate: "string",
    },
    primaryIndex: { partitionKey: "id" }
  })

  return {
    table,
    version_history
  }
}