import { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID, GraphQLFloat } from "graphql";
import { Electrodomesticos } from "../../Entities/Electrodomesticos";
import { typeElec } from "../typesDef/typesUsers";


//mutacion para agregar electrodomesticos desde graphql
export const agrgar_elec = {
    type: typeElec,
    args:{
        tipo: {type: GraphQLString},
        marca: {type: GraphQLString},
        precio:{type: GraphQLInt},
    },
    async resolve(_: any, args: any){
        const {tipo, marca, precio} = args
        console.log(args)
        const resul = await Electrodomesticos.insert({
        tipo: tipo,
        Marca: marca,
        Precio: precio,
        })
        console.log(resul)
        return {...args, id: resul.identifiers[0].id}
    }
    
};

//Metodo para Eliminar un electrodomesticos de la base de datos desde graphql
export const ELIMINAR_ELEC = {
    type: GraphQLBoolean,
    args: {
    id: {type: GraphQLID}
    },

    async resolve(_:any, {id}: any){
        const resul = await Electrodomesticos.delete(id);
        if(resul.affected === 1){
            return true;
        }else{
            console.log(resul)
            return false
        }      
    }
};

//Metodo para Actualizar un electrodomesticos en la base de datos desde graphql
export const ACTUALIZAR_ELEC = {
    type: GraphQLBoolean,
    args:{
        id: {type: GraphQLID},
        tipo: {type: GraphQLString},
        Marca: {type: GraphQLString},
        Precio:{type: GraphQLFloat}, 
    },

    async resolve(_: any, {id, tipo, Marca, Precio}: any){
    const exis_id = await Electrodomesticos.findOne({where: {id: id}})
    const resul = await Electrodomesticos.update({id}, {tipo, Marca, Precio})
    if(resul.affected === 1) 
    console.log(resul)
    return true;
    return false
    }
};
