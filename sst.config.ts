import { SSTConfig } from "sst"
import { StorageStack } from "./stacks/StorageStack"
import { ApiStack } from "./stacks/ApiStack"
import { QueueStack } from "./stacks/QueueStack"
import { FrontendStack } from "./stacks/FrontendStack"

export default {
  config(_input) {
    return {
      name: "mailing-list",
      region: "us-east-1",
    }
  },
  stacks(app) {
    app.stack(QueueStack).stack(StorageStack).stack(ApiStack).stack(FrontendStack)
  }
} satisfies SSTConfig
