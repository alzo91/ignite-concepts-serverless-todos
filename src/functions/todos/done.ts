import { APIGatewayProxyHandler } from "aws-lambda";
import { TodosRepository } from "src/providers/users/implementations/TodosRepository";

export const handle: APIGatewayProxyHandler = async (event) => {
  console.log("==> users.done.handle");

  const { userId, todoId } = event.pathParameters;

  const todosRepository = new TodosRepository();
  const todo = await todosRepository.done({ user_id: userId, todo_id: todoId });

  return {
    statusCode: 201,
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
