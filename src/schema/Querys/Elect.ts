import { GraphQLID, GraphQLList } from "graphql";
import { Electrodomesticos } from "../../Entities/Electrodomesticos";
import { typeElec, typeUsers } from "../typesDef/typesUsers";



//Metodo para listar todos los electrodomesticos
export const LISTAR_USERS = {
    type: new GraphQLList(typeElec),
    async resolve(){
        const resul = await Electrodomesticos.find()
        
        return resul
    },
};
//Metodo para listar un electrodomestico de la tabla electrodomesticos por medio de su ID
export const BUSCAR_USERS = {
    type: typeElec,
    args: { 
    id: {type: GraphQLID}
    },
    async resolve(_:any, args:any){
            const resul = await Electrodomesticos.findOne({where: {id: args.id}});
            console.log(resul)
            return resul
    }
};