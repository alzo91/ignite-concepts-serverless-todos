# Serverless - AWS Node.js Typescript

This project is final test that RocketSeat Ignite NodeJS

## Installation dependences
- yarn or npm instal

## Running Local
- yarn dynamodb:start
> This command will be initialize the dynamodb local.

- yarn dev
> It will be initialize application

![image](https://user-images.githubusercontent.com/19477370/135462599-9c2f492e-4822-4c5b-9494-9ab221985ba0.png)


## Testing by Insomia

### Create User
- POST
- url: http://localhost:3000/dev/users
- body: {"name": "your name","email": "your_email@domino.com.br"}

### Create TODO
- POST
- http://localhost:3000/dev/todos/{userId}
- { "title": "some title", "deadline": "{% now 'iso-8601', '' %} }

### LIST TODOS
- GET
- http://localhost:3000/dev/todos/{userId}
- No body

### Find one TODO
- GET
- http://localhost:3000/dev/todos/find/{todo_id}
- No body

### Done one TODO
- PATCH
- http://localhost:3000/dev/todos/{userId}/done/{todoId}
- No Body
