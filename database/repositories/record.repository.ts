import {AppDataSource} from "../data-source";
import {UsersEntity} from "../entities/user.entity";
import {CategoriesEntity} from "../entities/category.entity";
import {RecordsEntity} from "../entities/record.entity";

type RecordData = {
    recordId: number;
    recordDate: string;
    user: UsersEntity;
    category: CategoriesEntity;
};

export const RecordRepository = AppDataSource.getRepository(RecordsEntity).extend({
    async createUser(data: RecordData){
        const {recordId, recordDate, user, category} = data;
        return await RecordsEntity.create({
            recordId: recordId,
            recordDate: recordDate,
            user: user,
            category: category,
        }).save();
    },
    async removeUser(userId: number){
        const user = await UsersEntity.findOne({
            where: {userId: userId},
        });
        if (!user) return;
        await UsersEntity.remove(user);
    }
})