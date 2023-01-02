import {AppDataSource} from "../data-source";
import {UsersEntity} from "../entities/user.entity";
import {BalanceEntity} from "../entities/balance.entity";
import {RecordsEntity} from "../entities/record.entity";

type UserData = {
    userId?: number;
    name: string;
    balance?: BalanceEntity[];
    record?: RecordsEntity[];
};

export const UserRepository = AppDataSource.getRepository   (UsersEntity).extend({
    async createUser(data: UserData) {
        const {userId, name, balance, record} = data;

        return await UsersEntity.create({
            userId: userId,
            name: name,
            balance: balance,
            record: record,
        }).save();
    },
    async removeUser(userId: number){
        const user = await UsersEntity.findOne({
            where: {userId: userId},
        });
        if (!user) return;
        await UsersEntity.remove(user);
    },
    async getAllUsers(){
        const data = await UserRepository.find()
        //return await AppDataSource.manager.find(UsersEntity)
        let result = ' ';
        for (let i of data){
            result = result + JSON.stringify(i) + ', '
        }
        return result
    }

});
export {UserData};