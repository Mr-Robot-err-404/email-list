import { Api, StackContext, use } from "sst/constructs"
import { StorageStack } from "./StorageStack"

export function ApiStack({ stack }: StackContext) {
  const { table, version_history } = use(StorageStack)

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table, version_history],
      },
    },
    routes: {
      "GET /emails": "packages/functions/src/list.main",
      "POST /emails": "packages/functions/src/create.main",
      "DELETE /emails/{id}": "packages/functions/src/delete.main",
      "POST /version": "packages/functions/src/version.main"
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })

  return {
    api, 
  }
}