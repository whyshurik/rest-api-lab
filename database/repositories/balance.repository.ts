import {AppDataSource} from "../data-source";
import {UsersEntity} from "../entities/user.entity";
import {BalanceEntity} from "../entities/balance.entity";

type BalanceData = {
    balanceId?: number;
    money: number;
    user: UsersEntity;
};

export const BalanceRepository = AppDataSource.getRepository(BalanceEntity).extend({
    async createBalance(data: BalanceData){
        const {balanceId, money, user} = data;
        return await BalanceEntity.create({
            balanceId: balanceId,
            money: money,
            user: user,
        }).save();
    },
    async removeBalance(balanceId: number){
        const balance = await BalanceEntity.findOne({
            where: {balanceId: balanceId},
        });
        if (!balance) return;
        await BalanceEntity.remove(balance);
    },
    async addMoney(count, balanceId: number){
        const balance = await BalanceEntity.findOne({
            where: {balanceId: balanceId},
        });
        if (!balance) return;
        balance.money = balance.money + count;
        await BalanceEntity.save(balance);
    },
    async takeMoney(count, balanceId: number){
        const balance = await BalanceEntity.findOne({
            where: {balanceId: balanceId},
        });
        if (!balance) return;
        balance.money = balance.money - count;
        await BalanceEntity.save(balance);
    },
    async getAllBalances(){
        const data = await BalanceRepository.find()
        //return await AppDataSource.manager.find(UsersEntity)
        let result = ' ';
        for (let i of data){
            result = result + JSON.stringify(i) + ', '
        }
        return result
    }

})
export {BalanceData};