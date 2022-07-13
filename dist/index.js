"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const express_graphql_1 = require("express-graphql");
const db_1 = require("./db");
const schema_1 = require("./schema");
const connec = (0, db_1.connectDB)();
const app = (0, express_1.default)();
app.set('views', path.join(__dirname, '/views'));
app.set('views engine', 'ejs');
app.get('/', function (req, res) {
    res.render('home.ejs');
});
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    graphiql: true,
    schema: schema_1.schema
}));
exports.default = app;
