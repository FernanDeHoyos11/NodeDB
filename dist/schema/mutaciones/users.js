"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTUALIZAR_USUARIO = exports.ELIMINAR_USUARIO = exports.CREAR_USUARIO = void 0;
const graphql_1 = require("graphql");
const usuarios_1 = require("../../Entities/usuarios");
const typesUsers_1 = require("../typesDef/typesUsers");
//Metodo para crear un usuario en la base de datos desde graphql
exports.CREAR_USUARIO = {
    type: typesUsers_1.typeUsers,
    args: {
        nombre: { type: graphql_1.GraphQLString },
        apellido1: { type: graphql_1.GraphQLString },
        apellido2: { type: graphql_1.GraphQLString },
        usuario: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido1, apellido2, usuario, password } = args;
            console.log(args);
            const resul = yield usuarios_1.usuarios.insert({
                nombre: nombre,
                apellido1: apellido1,
                apellido2: apellido2,
                usuario: usuario,
                password: password,
            });
            console.log(resul);
            return Object.assign(Object.assign({}, args), { id: resul.identifiers[0].id });
        });
    }
};
//Metodo para Eliminar un usuario de la base de datos desde graphql
exports.ELIMINAR_USUARIO = {
    type: graphql_1.GraphQLBoolean,
    args: {
        id: { type: graphql_1.GraphQLID }
    },
    resolve(_, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const resul = yield usuarios_1.usuarios.delete(id);
            if (resul.affected === 1)
                return true;
            console.log(resul);
            return false;
        });
    }
};
//Metodo para Actualizar un usuario en la base de datos desde graphql
exports.ACTUALIZAR_USUARIO = {
    type: graphql_1.GraphQLBoolean,
    args: {
        id: { type: graphql_1.GraphQLID },
        nombre: { type: graphql_1.GraphQLString },
        apellido1: { type: graphql_1.GraphQLString },
        apellido2: { type: graphql_1.GraphQLString },
        usuario: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    },
    resolve(_, { id, nombre, apellido1, apellido2, usuario, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const exis_id = yield usuarios_1.usuarios.findOne({ where: { id: id } });
            const resul = yield usuarios_1.usuarios.update({ id }, { nombre, apellido1, apellido2, usuario, password });
            if (resul.affected === 1)
                console.log(resul);
            return true;
            return false;
        });
    }
};
