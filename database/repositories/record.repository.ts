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
    async createRecord(data: RecordData){
        const {recordId, recordDate, user, category} = data;
        return await RecordsEntity.create({
            recordId: recordId,
            recordDate: recordDate,
            user: user,
            category: category,
        }).save();
    },
    async removeRecord(recordId: number){
        const record = await RecordsEntity.findOne({
            where: {recordId: recordId},
        });
        if (!record) return;
        await RecordsEntity.remove(record);
    }
})