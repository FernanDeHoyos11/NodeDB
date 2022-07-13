import { createConnection } from 'typeorm'
import { Electrodomesticos } from './Entities/Electrodomesticos'
import {usuarios} from './Entities/usuarios'

//Conexion a la base de datos con NODEJS
export const connectDB = async () =>{
    await createConnection({
        type: 'mysql',
        username: 'root',
        password: '',
        port: 3306,
        host: 'localhost',
        database: 'usuarios',
        entities: [usuarios, Electrodomesticos],
        synchronize: true,
        ssl: false
    })
}