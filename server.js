const express = require("express");
const cors = require("cors");
const apiConfig = require("./api/config/config");
const app = express();

/* initialization link to database with Squelize */
const db = require("./api/models");
if (apiConfig.environment === "dev") {
  db.cnx.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
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
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/api/status", (request, response) => {
  response.json({ message: "API is UP" });
});

// import routes
require("./api/routes/formation.routes")(app);
require("./api/routes/category.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || apiConfig.express.portListen;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
