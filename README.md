# Serverless - AWS Node.js Typescript

This project is final test that RocketSeat Ignite NodeJS
- It is necessary to install serverless 
- You can install serverless using this link 
- https://www.serverless.com/framework/docs/getting-started

## Installation dependences
- yarn or npm instal

## Install Dynamodb local
- serverless dynamodb install

## Running DynamoDB Local
- yarn dynamo:start
> This command will lauch the dynamodb local.
![image](https://user-images.githubusercontent.com/19477370/135466279-6f88aa0d-b56d-4124-8940-5e3fd9b07ed0.png)

### Open other terminal and run this.
- yarn dev
> It will lauch the application

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
