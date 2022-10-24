import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: 'user'})
export class UsersEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({name: 'name', type: 'text'})
    name: string;

}