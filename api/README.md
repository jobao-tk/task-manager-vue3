# Task Manager REST API 
A RESTful API example for simple task manager application with Node, Express, Sequelize and PostgreSQL support

It is a just simple  RESTful API
## Installation & Run
```bash
# Download this project
git clone https://github.com/jobao-tk/task-manager-vue3.git
```

Before running API server, you should set the database config with yours or set the your database config with my values on [config.json](https://github.com/jobao-tk/task-manager-vue3/blob/master/api/src/config/config.json)
```json
{
  "development": {
    "username": "postgres",
    "password": "your_password",
    "database": "test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "your_password",
    "database": "database_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "your_password",
    "database": "database_production",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

```bash
# Run the migrations to set the database tables
cd /api
npx sequelize-cli db:migrate

```bash
# Run the API server
cd /api
npm start

# API Endpoint : http://127.0.0.1:5000



- [x] Support basic REST APIs.
- [x] Support Authentication with user for securing the APIs.
- [ ] Make convenient wrappers for creating API handlers.
- [ ] Write the tests for all APIs.
- [x] Organize the code with packages
- [ ] Building a deployment process 