import { APIGatewayProxyHandler } from "aws-lambda";
import { TodosRepository } from "src/providers/users/implementations/TodosRepository";

interface IRequest {
  title: string;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  console.log("==> users.create.handle");

  const { userId: user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as IRequest;

  const todosRepository = new TodosRepository();
  const todo = await todosRepository.create({ title, user_id, deadline });

  return {
    statusCode: 201,
    body: JSON.stringify({ todo }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
