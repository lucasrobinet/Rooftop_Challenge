import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Stores {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

}