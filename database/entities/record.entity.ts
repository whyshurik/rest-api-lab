import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {UsersEntity} from "./user.entity";
import {CategoriesEntity} from "./category.entity";

@Entity({name: 'record'})
export class RecordsEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    recordId: number;

    @Column({name: 'date', default: new Date(), type: 'datetime' })
    recordDate: Date;

    @ManyToOne(() => UsersEntity)
    @JoinColumn()
    user: UsersEntity;

    @ManyToOne(() => CategoriesEntity)
    @JoinColumn()
    category: CategoriesEntity;
}