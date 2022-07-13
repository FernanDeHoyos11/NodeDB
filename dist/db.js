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
exports.connectDB = void 0;
const typeorm_1 = require("typeorm");
const Electrodomesticos_1 = require("./Entities/Electrodomesticos");
const usuarios_1 = require("./Entities/usuarios");
//Conexion a la base de datos con NODEJS
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)({
        type: 'mysql',
        username: 'root',
        password: '',
        port: 3306,
        host: 'localhost',
        database: 'usuarios',
        entities: [usuarios_1.usuarios, Electrodomesticos_1.Electrodomesticos],
        synchronize: true,
        ssl: false
    });
});
exports.connectDB = connectDB;
