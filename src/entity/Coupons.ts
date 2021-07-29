import { Entity, Column, PrimaryGeneratedColumn,} from "typeorm";

@Entity()
export class Coupons {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    expires_at: string;

    @Column()
    assigned_at: string;

    @Column()
    customer_email: string;

}