const path = require("path");
const environmentSelected = "dev";
let environmentVariables;

if (environmentSelected === "dev") {
  environmentVariables = require('dotenv').config({ path: path.resolve(__dirname, "../.env.local"), multiline: true});
} else {
  environmentVariables = require('dotenv').config({ path: path.resolve(__dirname, "../.env.prod"), multiline: true});
}

module.exports = {
  environment: environmentSelected,
  express: {
    portListen: process.env.EXPRESS_PORT
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_TYPE
  }
}
