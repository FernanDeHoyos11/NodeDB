import { compare } from "bcryptjs";
import { resolveObjectURL } from "buffer";
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } from "graphql"
import { Electrodomesticos } from "../../Entities/Electrodomesticos";
import { usuarios } from "../../Entities/usuarios";
import { typeElec, typeUsers } from "../typesDef/typesUsers";

//Metodo para crear un usuario en la base de datos desde graphql
export const CREAR_USUARIO = {
    type: typeUsers,
    args:{
        nombre: {type: GraphQLString},
        apellido1: {type: GraphQLString},
        apellido2:{type: GraphQLString},
        usuario:{type: GraphQLString},
        password:{type: GraphQLString},

    },
    async resolve(_: any, args: any){
        const {nombre, apellido1, apellido2, usuario, password} = args
        console.log(args)
        const resul = await usuarios.insert({
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        usuario: usuario,
        password: password,
        })
        console.log(resul)
        return {...args, id: resul.identifiers[0].id}
    }
    
};

//Metodo para Eliminar un usuario de la base de datos desde graphql
export const ELIMINAR_USUARIO = {
    type: GraphQLBoolean,
    args: {
    id: {type: GraphQLID}
    },

    async resolve(_:any, {id}: any){
        const resul = await usuarios.delete(id);
        if(resul.affected === 1) return true;
            
        console.log(resul)
        return false
    }
};


//Metodo para Actualizar un usuario en la base de datos desde graphql
export const ACTUALIZAR_USUARIO = {
    type: GraphQLBoolean,
    args:{
        id: {type: GraphQLID},
        nombre: {type: GraphQLString},
        apellido1: {type: GraphQLString},
        apellido2:{type: GraphQLString},
        usuario:{type: GraphQLString},
        password:{type: GraphQLString},
        
    },

    async resolve(_: any, {id, nombre, apellido1, apellido2, usuario, password}: any){
    const exis_id = await usuarios.findOne({where: {id: id}})
    const resul = await usuarios.update({id}, {nombre, apellido1, apellido2, usuario, password})
    if(resul.affected === 1) 
    console.log(resul)
    return true;
    return false
    }
};
