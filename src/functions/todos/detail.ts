import { APIGatewayProxyHandler } from "aws-lambda";
import { TodosRepository } from "src/providers/users/implementations/TodosRepository";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { todoId: id } = event.pathParameters;

  const todosRepository = new TodosRepository();

  const todo = await todosRepository.findById({ id });

  return {
    statusCode: 200,
    body: JSON.stringify({ todo }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
