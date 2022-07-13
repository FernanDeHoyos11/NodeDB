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
exports.agrgar_elec = void 0;
const graphql_1 = require("graphql");
const Electrodomesticos_1 = require("../../Entities/Electrodomesticos");
const typesUsers_1 = require("../typesDef/typesUsers");
exports.agrgar_elec = {
    type: typesUsers_1.typeElec,
    args: {
        tipo: { type: graphql_1.GraphQLString },
        marca: { type: graphql_1.GraphQLString },
        precio: { type: graphql_1.GraphQLInt },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, marca, precio } = args;
            console.log(args);
            const resul = yield Electrodomesticos_1.Electrodomesticos.insert({
                tipo: tipo,
                Marca: marca,
                Precio: precio,
            });
            console.log(resul);
            return Object.assign(Object.assign({}, args), { id: resul.identifiers[0].id });
        });
    }
};
