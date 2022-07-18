import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

// creo un objeto llamado typeUsers con los parametros de la base de datos o la clase usuarios
export const typeUsers = new GraphQLObjectType({
    name: 'typeUsers',
    fields: {
        id: {type: GraphQLID},
        nombre: {type: GraphQLString},
        apellido1:{type: GraphQLString},
        apellido2:{type: GraphQLString},
        usuario:{type: GraphQLString},
        password:{type: GraphQLString},
    }

})

export const typeElec = new GraphQLObjectType({
    name: 'typeElec',
    fields: {
        id: {type: GraphQLID},
        Nombre: {type: GraphQLString},
        Precio:{type: GraphQLInt},
        Categoria:{type: GraphQLString},
        Marca:{type: GraphQLString},
        Descripcion:{type: GraphQLString},
    }

})

export const typeCat = new GraphQLObjectType({
    name: 'typeCat',
    fields: {
        id: {type: GraphQLID},
        NombreC: {type: GraphQLString},
        Descripcion:{type: GraphQLString},
    }

})
