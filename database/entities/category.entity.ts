import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: 'category'})
export class CategoriesEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column({name: 'name', type: 'text'})
    name: string;

}