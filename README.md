# Team Calendar
## Introduction

Team Calendar is a web application that allows users to create, view, and manage events. The application has two types of users: administrators and regular users. Administrators have the ability to create, view, update, and delete events. Regular users can only view events. The application has a RESTful API that is used to interact with the database. The API is secured using JWT tokens. The application has a web interface that is used to interact with the API.

## Prerequisites

- Docker
- Docker Compose

## Dockerized the Applications

### Database

MariaDB is used as the database for the application. We have a `Dockerfile` in the `db` directory which is used to build a Docker image of the MariaDB database.

### API

The API service typically runs on port `3000`. We have a `Dockerfile` in the `api` directory which is used to build a Docker image of the API.
The address of the API is `http://localhost:3000` when running in Docker.
And you can access the API documentation at `http://localhost:3000/api` when running in Docker.

### Web
We used ReactJS for the frontend. We have a `Dockerfile` in the `web` directory which is used to build a Docker image of the Web. 
The address of the web application is `http://localhost:3002` when running in Docker.

## Running the Applications

To run the applications, navigate to the root directory of the project and run the following command:

```bash
#Just run the following command to run the project
docker-compose up

#Here the administrator credentials
userEmail = 'admin@email.com'
name: 'Administrator'
password: 'Admin@Password1'
roleId: 1
```
### Important: 
#### For user creation, in the Role field: you can enter 1 for admin and  2 for user 
#### The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and min 8 characters.
#### The email must be a valid email address.


