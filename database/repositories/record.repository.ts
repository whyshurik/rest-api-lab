import {AppDataSource} from "../data-source";
import {UsersEntity} from "../entities/user.entity";
import {CategoriesEntity} from "../entities/category.entity";
import {RecordsEntity} from "../entities/record.entity";
import {BalanceRepository} from "./balance.repository";

type RecordData = {
    recordId?: number;
    recordDate: Date;
    money: number;
    user: UsersEntity;
    category: CategoriesEntity;
};

export const RecordRepository = AppDataSource.getRepository(RecordsEntity).extend({
    async createRecord(data: RecordData){
        const {recordId, recordDate, money, user, category} = data;
        const balanceEnt = await BalanceRepository.findOne({
            where: {user: {userId: user.userId}},relations:['user']
        })
        await BalanceRepository.update({user: { userId: balanceEnt.user.userId}}, {money: balanceEnt.money - money})
        return await RecordsEntity.create({
            recordId: recordId,
            recordDate: recordDate,
            money: money,
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
    },
    async getAllRecords(){
        const data = await RecordRepository.find({relations: ['user','category']})
        //return await AppDataSource.manager.find(UsersEntity)
        let result = ' ';
        for (let i of data){
            result = result + JSON.stringify(i) + ', '
        }
        return result
    }
})
export {RecordData};
