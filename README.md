# Study Guide Generator API

This project consists of a backend REST API for the related [study-guide-generator](https://github.com/alephnull7/study-guide-generator) project.
As noted below, proper implementation of this service requires the credentials of the corresponding database,
which are not contained in the files included here.

## Introduction

This README provides an overview of the backend structure, dependencies, and how to get started with development and deploying the API service.

## Table of Contents

* Project Structure
* Dependencies
* Deployment
* Operation
* Contributing
* License

## Project Structure

```
study-guide-generator_api/
├── artifactGeneration/
│   ├── artifactCreation.js
├── controllers/
│   ├── helpers/
│   │   ├── helpers.js
│   ├── artifactController.js
│   └── classroomController.js
│   └── userController.js
├── config/
│   ├── db.js
│   ├── fireBase.js
├── models/
│   ├── artifactModel.js
│   └── classroomModel.js
│   └── userModel.js
├── services/
│   ├── helpers/
│   │   ├── helpers.js
│   ├── artifactService.js
│   └── classroomService.js
│   └── userService.js
├── test/
├── .gitignore
├── LICENSE
├── README.md
├── package.json
└── server.json
```

* `server.js`: Entry point to API and routing to the entity-based controllers
* `controllers/`: Routes entity traffic to corresponding service based upon additional path specification and request type
* `services/`: Performs request validation and calls the appropriate model
* `models/`: Queries the database corresponding to valid request
* `config/db.js`: Connection to the database, with configuration thereof by environment variables
* `config/fireBase.js`: Connection to Firebase authentication, with configuration thereof by environment variables
* `artifactGeneration`: Modules related to creation of artifacts using OpenAI
* `test/`: Unit and integration tests 

## Dependencies

### Standard
* `body-parser`
* `cors`
* `dotenv`
* `express`
* `firebase`
* `openai`
* `pg`

### Dev
* `jest`
* `nodemon`

## Deployment

Below we use local deployment as an example.

1. Clone the repository:
```bash
git clone https://github.com/alephnull7/study-guide-generator-api
```

2. Navigate to the root of the project:
```bash
cd study-guide-generator-api
```

3. Install dependencies:
```bash
npm install
```

4. Access database, Firebase, and OpenAI credentials and make them available in the execution environment, 
such as an `.env` file at the project root.

5. Test the package
```bash
npm run test
```

6. Start the development server:
```bash
npm run dev
```

7. Open your browser and visit `http://localhost:3000` to access the API, or with an appropriate API client.

## Operation

Below are the defined routes and expected behavior by the API.

### Expected Behavior

* If the server encounters an internal error, a status code of 500 will be returned
* If an undefined route is sent a request, a status code of 404 will be returned
* If account with a given email exists, and there is an attempt to create another account with that email, a status code of 409 will be returned
* If unrecognized credentials are used to log in, a status code of 401 will be returned
* If a request that requires a token does not have a valid token in the header, a status code of 401 will be returned
* If a POST, PUT, or DELETE request is missing required properties in the body, a status code of 400 will be returned
* If a POST, PUT, or DELETE request corresponds to an entity that does not exist, a status code of 204 will be returned
* A successful POST request will return a status code of 201
* A successful GET, PUT, or DELETE request will return a status code of 200

### Auth

**These routes do not require a token in the request header.**
**If the request is successful, the response includes a token that can be used for other requests.**

* POST
  * `/api/auth/create`: creates the user corresponding to the information in the below body
  ```json lines
  {
  "email": string,
  "password": string,
  "account_type": int
  }
  ```
  * `/api/auth/login`: returns authentication credentials for the user corresponding to the information in the below body
  ```json lines
  {
  "email": string,
  "password": string,
  }
  ```

### Users

**These routes require a valid token in the request header**

* GET
  * `/api/users/students`: returns the records for student users

* PUT
  * `/api/users`: updates the user corresponding to the information in the below body.
    Note that the only required property is `uid`; any combination of the other three properties is allowed.
  ```json lines
  {
  "uid": string,
  "email": string,
  "username": string,
  "password": string
  }
  ```
* DELETE
  * `/api/users/:uid`: deletes the user corresponding to `uid`.
    On deletion, owned artifacts and instructed classrooms are deleted.

### Artifacts

**These routes require a valid token in the request header**

* POST
  * `/api/artifacts/templates`: creates the artifact template corresponding to the information in the below body
  ```json lines
  {
  "messages": json,
  "type": int,
  "name": string,
  "course": int
  }
  ```
  * `/api/artifacts`: creates the artifact corresponding to the information in the below body
  ```json lines
  {
  "uid": int,
  "template_id": int,
  "name": string,
  "classrooms": [int, ...]
  }
  ```
* GET
  * `/api/artifacts/study-guides/:uid`: returns the study guides for the user corresponding to `uid`
  * `/api/artifacts/study-guides/owned/:uid`: returns the study guides that are owned by the user corresponding to `uid`
  * `/api/artifacts/study-guides/assigned/:uid`: returns the study guides that have been assigned to user corresponding to `uid`
  * `/api/artifacts/quizzes/:uid`: returns the quizzes for the user corresponding to `uid`
  * `/api/artifacts/quizzes/owned/:uid`: returns the quizzes that are owned by the user corresponding to `uid`
  * `/api/artifacts/quizzes/assigned/:uid`: returns the quizzes that have been assigned to user corresponding to `uid`
  * `/api/artifacts/departments`: returns the records for all departments
  * `/api/artifacts/courses`: returns the records for all courses
  * `/api/artifacts/departments/courses/:id`: returns the courses for the department corresponding to `id`
  * `/api/artifacts/templates`: returns the records for all templates
  * `/api/artifacts/templates/courses/:id`: returns the templates for the course corresponding to `id`
  * `/api/artifacts/templates/departments/:id`: returns the templates for the department corresponding to `id`
  * `/api/artifacts/templates/:id`: returns the template corresponding to `id`
* DELETE
  * `/api/artifacts/:id`: deletes the artifact corresponding to `id`.
    An artifact that is currently assigned to a classroom can not be deleted.


### Classrooms

**These routes require a valid token in the request header**

* GET
  * `/api/classrooms/:id`: returns the students for the classroom corresponding to `id`
  * `/api/classrooms/instructors/:uid`: returns the classrooms instructed by user corresponding to `uid`
* POST
  * `/api/classroom`: creates the classroom corresponding to the information in the below body
  ```json lines
  {
  "uid": string, 
  "name": string,
  "course_id": string,
  "students": [int, ...]
  }
  ```
* PUT
  * `/api/classrooms`: updates the classroom corresponding to the information in the below body
  ```json lines
  {
  "name": string, 
  "id": int
  }
  ```
  * `/api/classroom/students/add`: adds students to a classroom, corresponding to a classroom `id` and student id array
  ```json lines
  {
  "id": int, 
  "students": [int, ...]
  }
  ```
  * `/api/classroom/students/remove`: removes students from a classroom, corresponding to a classroom `id` and student id array
  ```json lines
  {
  "id": int, 
  "students": [int, ...]
  }
  ```
  * `/api/classroom/artifacts/add`: adds an artifact to a classroom, corresponding to a classroom `id` and artifact id array
  ```json lines
  {
  "id": int, 
  "artifacts": [int, ...]
  }
  ```
  * `/api/classroom/artifacts/remove`: removes artifacts from a classroom, corresponding to a classroom `id` and artifact id array
  ```json lines
  {
  "id": int, 
  "students": [int, ...]
  }
  ```
* DELETE
  * `/api/classroom`: deletes the classroom corresponding to the information in the below body
  ```json lines
  {
  "id": int
  }
  ```  

## Contributing

The maintainer of this project is Greg Smith who can be contacted at <gregorymichaelsmith@protonmail.com>
if you have interest in contributing to this project.

## License

### MPL-2.0 license

An open-source software license that permits the use, modification, and distribution of covered software under certain conditions, including making modifications available under the MPL, while also incorporating a patent grant clause and compatibility with other open-source licenses.
