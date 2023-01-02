import {Router} from "express"
import {body, validationResult} from "express-validator";
import {RecordData, RecordRepository} from "../database/repositories/record.repository";
import {UsersEntity} from "../database/entities/user.entity";
import {CategoriesEntity} from "../database/entities/category.entity";
const router:Router = Router();

const validations = [
    body("money").exists().isNumeric().notEmpty(),
    body("user").exists().isInt().notEmpty(),
    body("category").exists().isInt().notEmpty()
]

router.post('/addrecord', validations, function(req: { body: { money: any; user: UsersEntity, category: CategoriesEntity }; }, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const obj:RecordData = {
        recordDate: new Date(),
        money: req.body.money,
        user: req.body.user,
        category: req.body.category
    }
    RecordRepository.createRecord(obj);
    res.send('records respond with a resource');
});
router.get('/', async function (_req: any, res: { send: (arg0: string) => void; }) {
    res.send(await RecordRepository.getAllRecords());
});

export {router}
