var enviroment = process.env.NODE_ENV || "production";
var config = require("./knexfile")[enviroment];

module.exports = require("knex")(config);
