import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
//

//Clase usuario
@Entity()
export class usuarios extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    apellido1: string;
    @Column()
    apellido2: string;
    @Column()
    usuario: string;
    @Column()
    password: string;
}