import * as entities from "../database/entities/entities"
import {Router} from "express"
import {CategoryData, CategoryRepository} from "../database/repositories/category.repository";
import {body, validationResult} from "express-validator";
const router:Router = Router();

const validations = [
    body("name").exists().isString().notEmpty(),
    body("recordId").isInt().optional()
]

router.post('/addcategory', validations,function(req: { body: { name: string; recordId: [] }; }, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const obj:CategoryData = {
        name: req.body.name,
        record: req.body.recordId,
    }
    CategoryRepository.createCategory(obj)
    res.send('categories respond with a resource');
});
router.get('/', async function (_req: any, res: { send: (arg0: string) => void; }) {
    res.send(await CategoryRepository.getAllCategories());
});

router.get('/getcategory', function(req, res) {
    const userid = req.query.userid;
    const categoryid = req.query.categoryid;
    const userdata = Array.from(entities.records).filter((record:any) => record.userId === userid && record.categoryId === categoryid);
    res.send(JSON.stringify(userdata));
});
export {router}
