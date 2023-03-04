var BaseModel = require("./BaseModel");
var { Model } = require("objection");

var knex = require("../../knex");
Model.knex(knex);

class Usuario extends BaseModel {
    static get tableName() {
        return "usuario";
    }
}

module.exports = Usuario;
