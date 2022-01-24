const express = require("express");
const cors = require("cors");
const apiConfig = require("./api/config/config");
const app = express();
const sequelizeFixtures = require('sequelize-fixtures');

/* initialization link to database with Squelize */
const db = require("./api/models");
if (apiConfig.environment === "dev") {
  db.cnx.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");

    /* Loading data to test the application during the development phase. */
    sequelizeFixtures.loadFile('fixtures/*.json', db).then(() => {
      console.log('Seed data used to tests application loaded!');
    });
  });
} else {
  db.cnx.sync();
}

/* Configuration used to cross-origin request */
const corsOptions = {
  origin: `http://localhost:${apiConfig.express.portListen}`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: [
    'Content-Type',
  ]
};

app.use(cors(corsOptions));
app.options('*', cors())

app.use(function(request, response, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // next();
  // Website you wish to allow to connect
  response.header('Access-Control-Allow-Origin', `http://localhost:${apiConfig.express.portListen}`);


  // Request methods you wish to allow
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  response.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With', 'X-HTTP-Method-Override');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  response.header('Access-Control-Allow-Credentials', true);

  if (request.method === 'OPTIONS') {
    response.sendStatus(200);
  } else {
    next();
  }
});

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// default route
app.get("/api/status", (request, response) => {
  response.json({message: "API ngFormation"});
});

// import routes
require("./api/routes/formation.routes")(app);
require("./api/routes/category.routes")(app);
require("./api/routes/former.routes")(app);
require("./api/routes/intern.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || apiConfig.express.portListen;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
