# Hacker news backend api

## This is a simple api for hacker news backend service.

Directory
```bash
src
 ┣ controllers
 ┃ ┗ news.controller.js
 ┣ middleware
 ┃ ┗ validate.routes.middleware.js
 ┣ models
 ┃ ┗ news.model.js
 ┣ routes
 ┃ ┗ news.routes.js
 ┣ schema
 ┃ ┗ news.schema.js
 ┣ services
 ┃ ┗ news.service.js
 ┣ utils
 ┃ ┣ db.connect.utils.js
 ┃ ┣ schedulePostSync.util.js
 ┃ ┗ start-server.utils.js
 ┣ app.js
 ┗ README.md
 ```
# Features 
- `GET` gets all stories categorised by `new` `top ` and  `best` stories.
- A scheduled job `POST`, that sync the published news to a DB every 5 minutes categorized by story types `top`, `new`, and `best`.
- user `POST`, lets users post's their own story articles.
- Allows filtering by the type of item(types/category).
- Paginated requests of 10 items per requests.

# POST endpoint for posting thirdparty/personal articles
`http://localhost:1435/api/v1/news/article`


## Technologies used
### 1. [node.js](https://nodejs.org/)
### 2. [express](https://expressjs.com/)
### 3. [mongoose](https://mongoosejs.com/)

# How to start the app
clone the repo and `yarn install` to install the project dependencies and then 

`yarn start ` to start the app in development

`yarn dev ` to start the app in production

# Scheduled posts
in the utils directory under the src folder, there is a file named `start-server.utils.js` which contains the api key and the api url.
uncomment the lines in the file to use the the `schedulePostsSync()`function this starts the `scheduler that fetches posts every 5 mins`.


## about the developer
Emeka Okoli
[twitter](https://twitter.com/emyokoli)