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

const corsOptions = {
  origin: `http://localhost:${apiConfig.express.portCorsOption}`
};

app.use(cors(corsOptions));

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
