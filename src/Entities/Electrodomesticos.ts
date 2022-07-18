import {BaseEntity, Column, Double, Entity, PrimaryGeneratedColumn} from 'typeorm'
//

//Clase usuario
@Entity()
export class Electrodomesticos extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    Precio: number;
    @Column()
    Categoria: string;
    @Column()
    Marca: string;
    @Column()
    Descripcion: string
}