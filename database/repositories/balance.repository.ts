import {AppDataSource} from "../data-source";
import {UsersEntity} from "../entities/user.entity";
import {BalanceEntity} from "../entities/balance.entity";

type BalanceData = {
    balanceId: number;
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
    async removeUser(userId: number){
        const user = await UsersEntity.findOne({
            where: {userId: userId},
        });
        if (!user) return;
        await UsersEntity.remove(user);
    }
})