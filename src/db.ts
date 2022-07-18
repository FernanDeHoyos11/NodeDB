import { createConnection } from 'typeorm'
import { Electrodomesticos } from './Entities/Electrodomesticos'
import {usuarios} from './Entities/usuarios'
import './config'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config'
import { Direccion } from './Entities/Direccion'
import { categorias } from './Entities/categoria'


//Conexion a la base de datos con NODEJS
export const connectDB = async () =>{
    await createConnection({
        type: 'mysql',
        username: DB_USERNAME,
        password: DB_PASSWORD,
        port: Number (DB_PORT),
        host: DB_HOST,
        database: DB_NAME,
        entities: [usuarios, Electrodomesticos, Direccion, categorias],
        synchronize: true,
        ssl: false
    })
}