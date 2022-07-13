
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {GREETING} from './Querys/greeting'
import { ELIMINAR_USUARIO, ACTUALIZAR_USUARIO } from './mutaciones/users'
import { agrgar_elec, ELIMINAR_ELEC, ACTUALIZAR_ELEC} from "./mutaciones/Electrodomesticos";
import { CREAR_USUARIO } from "./mutaciones/users";
import { LISTAR_USERS, BUSCAR_USERS } from "./Querys/users";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        GREETING: GREETING,
        LISTAR_USERS: LISTAR_USERS,
        BUSCAR_USERS: BUSCAR_USERS,
        
    },
});

const mutacion = new GraphQLObjectType({
    name: 'mutacion',
    fields: {
        CREAR_USUARIO: CREAR_USUARIO,
        ELIMINAR_USUARIO: ELIMINAR_USUARIO,
        ACTUALIZAR_USUARIO: ACTUALIZAR_USUARIO,
        AGREGAR_ELEC: agrgar_elec,
        ELIMINAR_ELEC: ELIMINAR_ELEC,
        ACTUALIZAR_ELEC: ACTUALIZAR_ELEC,

    },
})
export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: mutacion,
})