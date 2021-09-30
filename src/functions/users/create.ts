import { APIGatewayProxyHandler } from "aws-lambda";
import { UsersRepository } from "src/providers/users/implementations/UsersRepository";
import { uuidv4 } from "src/utils/uuid";

interface IRequest {
  name: string;
  email: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  console.log("==> users.create.handler");

  const { name, email } = JSON.parse(event.body) as IRequest;

  if (!name || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Parameters doesn't exist` }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const usersRepository = new UsersRepository();
  const userAlreadyExist = await usersRepository.findByEmail({ email });

  if (!!userAlreadyExist) {
    return {
      statusCode: 200,
      body: JSON.stringify({ user: userAlreadyExist }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  const user_id = uuidv4();
  await usersRepository.create({ email, name, id: user_id });
  const user = await usersRepository.findById({ id: user_id });
  return {
    statusCode: 201,
    body: JSON.stringify({ user }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
