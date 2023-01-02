import {
    BaseEntity,
    Column,
    Entity, JoinColumn, OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {RecordsEntity} from "./record.entity";

@Entity({name: 'category'})
export class CategoriesEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column({name: 'name', type: 'text'})
    name: string;

    @OneToMany(() => RecordsEntity, (record) => record.category)
    @JoinColumn({name: 'fk_recordId'})
    record: RecordsEntity[];
}