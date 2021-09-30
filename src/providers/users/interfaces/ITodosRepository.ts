interface ITodos {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: Date;
  updated_at: Date;
}

interface ICreateTodos {
  user_id: string;
  title: string;
  deadline: Date;
}

interface IDoneTodos {
  user_id: string;
  todo_id: string;
}

interface ITodosRepository {
  create(data: ICreateTodos): Promise<ITodos>;
  list({ user_id }: { user_id: string }): Promise<ITodos[]>;
  findById({ id }: { id: string }): Promise<ITodos>;
  done({ user_id, todo_id }: IDoneTodos): Promise<ITodos>;
}

export { ITodos, ICreateTodos, IDoneTodos, ITodosRepository };
