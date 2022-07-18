import {BaseEntity, Column, Double, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';
import { usuarios } from './usuarios';



//Clase usuario
@Entity()
export class Direccion extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    idUsuario: string
    @Column()
    Ciudad: string;
    @Column()
    Barrio: string;
    @Column()
    Calle: string;
}