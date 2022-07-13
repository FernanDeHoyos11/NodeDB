"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeElec = exports.typeUsers = void 0;
const graphql_1 = require("graphql");
// creo un objeto llamado typeUsers con los parametros de la base de datos o la clase usuarios
exports.typeUsers = new graphql_1.GraphQLObjectType({
    name: 'typeUsers',
    fields: {
        id: { type: graphql_1.GraphQLID },
        nombre: { type: graphql_1.GraphQLString },
        apellido1: { type: graphql_1.GraphQLString },
        apellido2: { type: graphql_1.GraphQLString },
        usuario: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    }
});
exports.typeElec = new graphql_1.GraphQLObjectType({
    name: 'typeElec',
    fields: {
        id: { type: graphql_1.GraphQLID },
        tipo: { type: graphql_1.GraphQLString },
        marca: { type: graphql_1.GraphQLString },
        precio: { type: graphql_1.GraphQLInt },
    }
});
