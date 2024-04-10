import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column()
    price: number;

    @AutoMap()
    @Column()
    quantity: number;
}