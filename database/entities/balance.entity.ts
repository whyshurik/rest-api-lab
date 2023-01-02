import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {UsersEntity} from "./user.entity";
``
@Entity({name: 'balance'})
export class BalanceEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    balanceId: number;

    @Column({name: 'money', type: 'numeric'})
    money: number;

    @ManyToOne(() => UsersEntity, (user) => user.balance)
    @JoinColumn()
    user: UsersEntity;

}