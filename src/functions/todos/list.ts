import { APIGatewayProxyHandler } from "aws-lambda";
import { TodosRepository } from "src/providers/users/implementations/TodosRepository";
import { UsersRepository } from "src/providers/users/implementations/UsersRepository";

export const handle: APIGatewayProxyHandler = async (event) => {
  console.log("==> users.list.handler");

  const { userId } = event.pathParameters;

  const usersRepostiory = new UsersRepository();
  const user = await usersRepostiory.findById({ id: userId });

  const todosRepository = new TodosRepository();
  const todos = await todosRepository.list({ user_id: userId });

  const response = { user: { name: user.name, id: user.id }, todos };

  return {
    statusCode: 201,
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
