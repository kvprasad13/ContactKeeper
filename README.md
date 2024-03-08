# ContactKeeper

ContactKeeper is a backend application built using Express, Node.js, and MongoDB. It allows users to store their contact details like name, email, and mobile number securely. User Authentication is implemented to enhance security and access control features. RESTful API endpoints are established to facilitate efficient CRUD operations on contacts.

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/yourusername/contactKeeper.git
cd contactKeeper
```
Install the dependencies:

```bash
npm install express cors jsonwebtoken mongoose
npm install --save-dev nodemon
```




## Table of Contents

- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Commands

Running in development:

```bash
npm start
# or
npm run dev
```


## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash

# Port
PORT = # default 666

# URL of the Mongo DB
CONNECTION_STRING = mongodb://127.0.0.1:27017/database_name

# JWT
ACCESS_TOKEN_SECRET = # YOUR_TOKEN_SECRET

```

## Project Structure

```
contactKeeper/
|-- config/
|   |-- dbConnection.js

|-- controllers/
|   |-- contactController.js
|   |-- userController.js

|-- middlewares/
|   |-- errorHandler.js
|   |-- validTokenHandler.js

|-- models/
|   |-- contactModel.js
|   |-- userModel.js

|-- routers/
|   |-- accountRouter.js
|   |-- contactRouter.js

|-- constants.js
|-- server.js
|-- .env
|-- README.md

```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST api/users/register` - Signup\
`POST api/users/login` - Signin\
`GET api/users/current` - Current User

**Contact routes**:\
`POST api/contacts` - Create a Contact\
`GET api/contacts` - Get all Current User Contacts\
`GET api/contacts/:id` - Get Contact\
`PUT api/contacts/:id` - Update Contact \
`DELETE api/contacts/:id` - Delete Contact 

# Author
Varaprasad Kade
