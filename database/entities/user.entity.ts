import {
    BaseEntity,
    Column,
    Entity, JoinColumn, OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {BalanceEntity} from "./balance.entity";
import {RecordsEntity} from "./record.entity";

@Entity({name: 'user'})
export class UsersEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({name: 'name', type: 'text'})
    name: string;

    @OneToMany(() => BalanceEntity, (balance) => balance.user)
    @JoinColumn({name: 'fk_balanceId'})
    balance: BalanceEntity[];

    @OneToMany(() => RecordsEntity, (record) => record.user)
    @JoinColumn({name: 'fk_recordId'})
    record: RecordsEntity[];
}