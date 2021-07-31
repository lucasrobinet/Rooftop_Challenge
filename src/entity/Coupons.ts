import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Coupons {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    expires_at: string;

    @Column({type: "time without time zone"})
    assigned_at: Date;

    @Column()
    customer_email: string;

}