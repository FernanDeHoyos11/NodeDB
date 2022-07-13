"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const greeting_1 = require("./Querys/greeting");
const users_1 = require("./mutaciones/users");
const Electrodomesticos_1 = require("./mutaciones/Electrodomesticos");
const users_2 = require("./mutaciones/users");
const users_3 = require("./Querys/users");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        GREETING: greeting_1.GREETING,
        LISTAR_USERS: users_3.LISTAR_USERS,
        BUSCAR_USERS: users_3.BUSCAR_USERS,
    },
});
const mutacion = new graphql_1.GraphQLObjectType({
    name: 'mutacion',
    fields: {
        CREAR_USUARIO: users_2.CREAR_USUARIO,
        ELIMINAR_USUARIO: users_1.ELIMINAR_USUARIO,
        ACTUALIZAR_USUARIO: users_1.ACTUALIZAR_USUARIO,
        AGREGAR_ELEC: Electrodomesticos_1.agrgar_elec,
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: mutacion,
});
