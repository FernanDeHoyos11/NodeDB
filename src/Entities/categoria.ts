import {BaseEntity, Column, Double, Entity, PrimaryGeneratedColumn} from 'typeorm'
//

//Clase usuario
@Entity()
export class categorias extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombreC: string;
    @Column()
    descripcion: string;  
}