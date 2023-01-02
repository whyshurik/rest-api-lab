import {AppDataSource} from "../data-source";
import {CategoriesEntity} from "../entities/category.entity";
import {RecordsEntity} from "../entities/record.entity";

type CategoryData = {
    categoryId?: number;
    name: string;
    record?: RecordsEntity[];
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
    async removeCategory(categoryId: number){
        const category = await CategoriesEntity.findOne({
            where: {categoryId: categoryId},
        });
        if (!category) return;
        await CategoriesEntity.remove(category);
    },
    async getAllCategories(){
        const data = await CategoryRepository.find({relations: ['record']})
        //return await AppDataSource.manager.find(UsersEntity)
        let result = ' ';
        for (let i of data){
            result = result + JSON.stringify(i) + ', '
        }
        return result
    }
})
export {CategoryData};