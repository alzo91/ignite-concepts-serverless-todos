interface ICreateUser {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

interface IUsersRepository {
  create(data: Omit<ICreateUser, "created_at">): Promise<void>;
  findById({ id }: { id: string }): Promise<ICreateUser>;
  findByEmail({ email }: { email: string }): Promise<ICreateUser>;
}

export { ICreateUser, IUsersRepository };
