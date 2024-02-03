import { StackContext, Table } from "sst/constructs"

export function StorageStack({ stack }: StackContext) {
    
  const table = new Table(stack, "Emails", {
    fields: {
      userId: "string",
    },
    primaryIndex: { partitionKey: "userId" },
  })

  return {
    table,
  }
}