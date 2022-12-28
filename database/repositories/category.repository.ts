import {AppDataSource} from "../data-source";
import {UsersEntity} from "../entities/user.entity";
import {CategoriesEntity} from "../entities/category.entity";
import {RecordsEntity} from "../entities/record.entity";

type CategoryData = {
    categoryId: number;
    name: string;
    record: RecordsEntity[];
};

export const CategoryRepository = AppDataSource.getRepository(CategoriesEntity).extend({
    async createCategory(data: CategoryData){
        const {categoryId, name, record} = data;
        return await CategoriesEntity.create({
            categoryId: categoryId,
            name: name,
            record: record,
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