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
exports.BUSCAR_USERS = exports.LISTAR_USERS = void 0;
const graphql_1 = require("graphql");
const usuarios_1 = require("../../Entities/usuarios");
const typesUsers_1 = require("../typesDef/typesUsers");
//Metodo para listar todos los usuario de la tabla usuarios
exports.LISTAR_USERS = {
    type: new graphql_1.GraphQLList(typesUsers_1.typeUsers),
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const resul = yield usuarios_1.usuarios.find();
            return resul;
        });
    },
};
//Metodo para listar un usuario de la tabla usuarios por medio de su ID
exports.BUSCAR_USERS = {
    type: typesUsers_1.typeUsers,
    args: {
        id: { type: graphql_1.GraphQLID }
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const resul = yield usuarios_1.usuarios.findOne({ where: { id: args.id } });
            console.log(resul);
            return resul;
        });
    }
};
