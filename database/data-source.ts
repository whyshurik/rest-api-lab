import {env} from 'process';
import {DataSource} from 'typeorm';
import {CategoriesEntity} from "./entities/category.entity";
import {UsersEntity} from "./entities/user.entity";
import {RecordsEntity} from "./entities/record.entity";
import {BalanceEntity} from "./entities/balance.entity";

let AppDataSource: DataSource;

const createConnection = () => {
    AppDataSource = new DataSource({
        type: 'postgres',
        host: env.PG_HOST,
        port: Number(env.PG_USER),
        password: env.PG_PASS,
        database: env.PG_NAME,
        synchronize: true,
        entities: [
            CategoriesEntity,
            UsersEntity,
            RecordsEntity,
            BalanceEntity,
        ],
    });

    AppDataSource.initialize()
        .then(() => {
            console.log('[DB] data source has been initialised.');
        })
        .catch((err) => {
            console.error('[DB] error during data source initialization',err);
        });
    return AppDataSource;
};

export { createConnection, AppDataSource };