# nest-microservices

2 NestJS application are found here: admin and main, both are demonstrating the microservices pattern.

**Admin** microservice has MySQL as a database which you can run with the command:
```docker-compose up```

If you changed docker-compose.yml file please restart docker with:
```docker-compose up --detach --build```
```docker-compose restart```

Then start application in developement mode with:
```npm run start:deb```

-------

**Main** microservice has MongoDB as a databse which you can run with the command:
```docker run --name mongodb -d -p 27018:27018 mongo```

Then it needs to run t instances: 1 for the actual REST API server, the other for the RabbitMQ instnace that listen to events.

Run REST serve in developemnt mode with the command:
```npm run start:dev```

Run RabbitMQ listener with the command:
```npm run listener```
