import { EventHandler } from "sst/node/event-bus";
import { Todo } from "@mailing-list/core/todo";

export const handler = EventHandler(Todo.Events.Created, async (evt) => {
  console.log("Todo created", evt);
});
