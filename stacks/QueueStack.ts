import { StackContext, Queue } from "sst/constructs";

export function QueueStack({ stack }: StackContext) {
  const queue = new Queue(stack, "Queue", {
    consumer: "packages/functions/src/send.main",
  })

  return {
    queue
  }
}