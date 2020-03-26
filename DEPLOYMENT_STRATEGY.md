#### Heroku Deployment Strategy for React, Express, MySQL full stack application

​

- You will need [nodejs](https://nodejs.org/en/download/) installed on your machine before you follow the deployment strategy.
  ​
- Create an account on [heroku](https://id.heroku.com/login).
  ​
- Install heroku CLI using this [link](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).
  ​
- Open Terminal/Command Prompt and run `heroku --version` to check for proper installation of Heroku CLI.
  ​
- Make sure to use proper folder structure to follow this strategy. Create a **project folder with two sub folders**. First will be **client** which will be your react project. Second, a **server** folder which has express setup, orm setup & anything else you need in the backend.
  ​
- Open the project in VS Code. Open integrated terminal and navigate to your project.
  ​
- Let's first make all the necessary changes in the code for deployment.
  ​

* Run `heroku login` to quickly login into heroku using CLI.
  ​
* Run `heroku create` to create an app instance with a unique url. This is the url we will deploy our app to.
  ​
* If your project is not a git project, run `git init` at root level of project to change it into a git project.
  ​

#### Heroku Configuration

​

- Login into [heroku](https://id.heroku.com/login).
  ​
- The app you created should appear on dashboard.
  ​
- Click on your app url.
  ​
- Go to Resources Tab. Click in add on search bar and search for **JawsDB MySQL** for SQL database & **mLab MongoDB** if you are using nosql mongodb.
  ​
- Provision free version of JawsDB Database as Service and click next. Make sure you select the free version.
  ​
- Once it's provisioned, click on JAWSDB MySQL instance and it will open a new page for you with database details. Copy the connection string that is available on top of the page in format **mysql://username:password@host:port/database** and save it for later use or come back to resources tab to get the details.
  ​
- Goto settings tab, click on **Reveal Config Vars** button. Make sure you have a config var entry there that is pointing to JawsDB URL.
  ​
- If not, you can manually add one. JAWSDB_URL & above connection string will be the key value pair. Enter them in the textbox.
  ​
- Goto Buildpacks section under settings tab. Click on add buildpack and search for nodejs. Add it as your buildpack. You should see heroku/nodejs once you have successfully added.
  ​

#### Changes in react front end client application

​

- Open package.json in your client side and your app url as proxy - `"proxy": "https://<app_name>.herokuapp.com:5000"`
- Make sure to remove all instances of `localhost:5000` in your front end and replace it with just the remaining portion of your api call. e.g. `localhost:5000/api/warehouse` can be changed to `/api/warehouse`.
  ​

#### Changes in express back end application with mysql ORM of your choice.

​

- Open config file with datababase connections. For Knex/Bookshelf it will be **knexfile.js**
- Add your production database connection (Heroku JAWSDB) to your json.
  ​

```
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "username",
      password: "password",
      database: "instock",
      charset: "utf8",
      insecureAuth: true
    }
  },
  production: {
    client: "mysql",
    connection: process.env.JAWSDB_URL
  }
};
```

​

- Add following to your backend entry point file **index.js**. You will need **mysql2** package installed on server side :
  ​

```
const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const cors = require("cors");
const mysql = require("mysql");
const knex = require("./knexfile");

const app = express();

const warehouseRoute = require("./routes/warehouse");
const inventoryRoute = require("./routes/inventory");

const PORT = process.env.PORT || 5000;

//  cors support
app.use(cors());

//  init middleware
app.use(logger);

//  body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/warehouse", warehouseRoute);
app.use("/inventory", inventoryRoute);

let connection;
//make connection
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection(knex.development);
}

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

connection.connect(err => {
  console.log("connected as id " + connection.threadId);
});
// Export connection for our ORM to use.
module.exports = connection;
​
```

​- Your **bookshelf.js** should look like following

```
const knex =
  process.env.NODE_ENV === "production"
    ? require("knex")(require("./knexfile").production)
    : require("knex")(require("./knexfile").development);

const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;

```

- Add following scripts to your back end if you don't have them already. Make sure to install concurrently & nodemon (as a dev dependency) on server side. To install dev dependency, run `npm i -D package_name`.
  ​

```
  "scripts": {
    "client": "npm start --prefix client",
    "start": "npm start --prefix server",
    "server": "nodemon index --prefix server",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm install --prefix server && npm run build --prefix client"
  }
```

​

#### Getting ready for deployment

​

- Open terminal and navigate to your project. Run following commands from root of your project. Make sure you initialized git repository at root level when you did `git init` in previous step and not inside of client or server folder.
  ​
- Run `heroku git:remote -a name_of_your_app`. If your app is called `one-two-12345.herokuapp.com`, then just use `one-two-12345` as your app name.
- `git add .`
- `git commit -m "deploying to heroku"`
- `git push heroku master`
  ​
- If you face errors, go to your app on heroku webpage & click on more dropdown select and select view logs. Logs will tell you what exactly went wrong. Search for help on stackoverflow.
  ​
- Before you open app, click on more dropdown select, click on run console and type bash to open a bash terminal.
  ​
- This is where you can run your migration and seed commands if you already have it setup.
  ​
- For Knex/Bookshelf ORM, this would be `knex migrate:latest` for migration & `knex seed:run` for seeding data.
  ​
- If everything goes well, you can open your app using the url or by going to app on heroku webpage and clicking **Open app** button.
