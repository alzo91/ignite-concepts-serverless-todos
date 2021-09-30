import dayjs from "dayjs";
import { document } from "src/utils/dynamodbClient";
import { uuidv4 } from "src/utils/uuid";

import {
  ICreateTodos,
  IDoneTodos,
  ITodos,
  ITodosRepository,
} from "../interfaces/ITodosRepository";

class TodosRepository implements ITodosRepository {
  private TableName = "todos";

  //
  async create(data: ICreateTodos): Promise<ITodos> {
    const { title, user_id, deadline } = data;
    console.log("todos.create", title, user_id, deadline);

    const id = uuidv4();
    const updated_at = Date.now();
    const done = false;

    const created_todo = await document
      .put({
        TableName: this.TableName,
        Item: { id, title, user_id, deadline, updated_at, done },
      })
      .promise();
    console.log(created_todo);
    const todo: ITodos = {
      id,
      title,
      user_id,
      deadline,
      updated_at: dayjs(updated_at).toDate(),
      done,
    };
    return todo;
  }

  //
  async list({ user_id }: { user_id: string }): Promise<ITodos[]> {
    const todos: ITodos[] = [];
    const load_todos = await document
      .scan({
        TableName: this.TableName,
        FilterExpression: "#user_id = :user_id",
        ExpressionAttributeNames: {
          "#user_id": "user_id",
        },
        ExpressionAttributeValues: {
          ":user_id": user_id,
        },
      })
      .promise();

    load_todos.Items.map((todo) =>
      todos.push({
        id: todo.id,
        title: todo.title,
        user_id: todo.user_id,
        deadline: todo.deadline,
        updated_at: dayjs(todo.updated_at).toDate(),
        done: todo.done,
      })
    );

    return todos;
  }

  async findById({ id }: { id: string }): Promise<ITodos> {
    console.log("todos.done", id);
    const todos = await document
      .query({
        TableName: this.TableName,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: { ":id": id },
      })
      .promise();
    return todos.Items[0] as ITodos;
  }

  async done({ user_id, todo_id }: IDoneTodos): Promise<ITodos> {
    const updated_at = Date.now();
    const done = true;

    await document
      .update({
        Key: { id: todo_id },
        TableName: this.TableName,
        UpdateExpression: "SET done = :done, updated_at = :updated_at",
        ExpressionAttributeValues: { ":done": done, ":updated_at": updated_at },
      })
      .promise();
    const todo = await this.findById({ id: todo_id });
    return todo;
  }
}

export { TodosRepository };
