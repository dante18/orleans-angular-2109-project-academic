const express = require("express");
const cors = require("cors");
const apiConfig = require("./api/config/config");
const app = express();

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

// set port, listen for requests
const PORT = process.env.PORT || apiConfig.express.portListen;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
