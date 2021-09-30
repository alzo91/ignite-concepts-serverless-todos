import { ICreateUser, IUsersRepository } from "../interfaces/IUsersRepository";
import { document } from "src/utils/dynamodbClient";

class UsersRepository implements IUsersRepository {
  private TableName = "users";

  async create(data: Omit<ICreateUser, "created_at">): Promise<void> {
    const { name, email, id } = data;

    await document
      .put({
        TableName: this.TableName,
        Item: { id, full_name: name, email, created_at: Date.now() },
      })
      .promise();
  }

  async findById({ id }: { id: string }): Promise<ICreateUser> {
    const users = await document
      .query({
        TableName: this.TableName,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: { ":id": id },
      })
      .promise();

    const existUser = users.Items[0];

    if (!existUser) return undefined;

    const user = {
      id: existUser.id,
      email: existUser.email,
      name: existUser.full_name,
      created_at: existUser.created_at,
    };

    return user;
  }

  async findByEmail({ email }: { email: string }): Promise<ICreateUser> {
    const users = await document
      .scan({
        TableName: this.TableName,
        FilterExpression: "#email = :email",
        ExpressionAttributeNames: {
          "#email": "email",
        },
        ExpressionAttributeValues: {
          ":email": email,
        },
      })
      .promise();
    // .query({
    //   TableName: this.TableName,
    //   KeyConditionExpression: "email = :email",
    //   ExpressionAttributeValues: { ":email": email },
    // })
    // .promise();

    const existUser = users.Items[0];

    if (!existUser) return undefined;

    const user = {
      id: existUser.id,
      email: existUser.email,
      name: existUser.full_name,
      created_at: existUser.created_at,
    };

    return user;
  }
}

export { UsersRepository };
