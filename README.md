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
├── controllers/
│   ├── helpers/
│   │   ├── helpers.js
│   ├── artifactController.js
│   └── classroomController.js
│   └── userController.js
├── db/
│   ├── db.js
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
* `db/db.js`: Connection to the database, with configuration thereof by environment variables
* `test/`: Unit and integration tests 

## Dependencies

### Standard
* `body-parser`
* `cors`
* `dotenv`
* `express`
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

4. Access database credentials and make them available in the execution environment, 
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
* If a POST, PUT, or DELETE request is missing required properties in the body, a status code of 400 will be returned
* If a POST, PUT, or DELETE request corresponds to an entity that does not exist, a status code of 204 will be returned
* A successful POST request will return a status code of 201
* A successful GET, PUT, or DELETE request will return a status code of 200

### Users

* GET
  * `/api/users/:id`: returns the user info for the user corresponding to `id`
* POST
  * `/api/users`: creates the user corresponding to the information in the below body
  ```json lines
  {
  "email": email, 
  "account_type": int,
  "password": password
  }
  ```
* PUT
  * `/api/users`: updates the user corresponding to the information in the below body
  ```json lines
  {
  "email": email, 
  "id": int
  }
  ```
* DELETE
  * `/api/users`: deletes the user corresponding to the information in the below body
  ```json lines
  {
  "id": int
  }
  ```

### Artifacts

* GET
  * `/api/artifacts/study-guides/:id`: returns the study guide info for the study guide corresponding to `id`
  * `/api/artifacts/quizzes/:id`: returns the quiz info for the quiz corresponding to `id`

### Classrooms

* GET
  * `/api/classrooms/:id`: returns all the students and their assigned classrooms, for classrooms instructed by instructor user corresponding to `id`
* POST
  * `/api/classroom`: creates the classroom corresponding to the information in the below body
  ```json lines
  {
  "user_id": int, 
  "name": string
  }
  ```
* PUT
  * `/api/classroom/add`: adds students to a classroom, corresponding to a classroom `id` and student id array
  ```json lines
  {
  "id": int, 
  "students": [int, ...]
  }
  ```
  * `/api/classroom/remove`: removes students from a classroom, corresponding to a classroom `id` and student id array
  ```json lines
  {
  "id": int, 
  "students": [int, ...]
  }
  ```
  * `/api/classroom/assign`: adds an artifact to a classroom, corresponding to a classroom `id` and artifact id array
  ```json lines
  {
  "id": int, 
  "artifacts": [int, ...]
  }
  ```
* DELETE
  * `/api/users`: deletes the classroom corresponding to the information in the below body
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
