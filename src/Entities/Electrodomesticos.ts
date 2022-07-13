import {BaseEntity, Column, Double, Entity, PrimaryGeneratedColumn} from 'typeorm'
//

//Clase usuario
@Entity()
export class Electrodomesticos extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    tipo: string;
    @Column()
    Marca: string;
    @Column()
    Precio: number;
}