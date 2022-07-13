
import { GraphQLID, GraphQLList } from "graphql";
import { resolve } from "path";
import { getRepository } from "typeorm";
import { usuarios } from "../../Entities/usuarios";
import { typeUsers } from "../typesDef/typesUsers";


//Metodo para listar todos los usuario de la tabla usuarios
export const LISTAR_USERS = {
    type: new GraphQLList(typeUsers),
    async resolve(){
        const resul = await usuarios.find()
        
        return resul
    },
};
//Metodo para listar un usuario de la tabla usuarios por medio de su ID
export const BUSCAR_USERS = {
    type: typeUsers,
    args: { 
    id: {type: GraphQLID}
    },
    async resolve(_:any, args:any){
            const resul = await usuarios.findOne({where: {id: args.id}});
            console.log(resul)
            return resul
    }
};


