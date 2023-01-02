import * as entities from "../database/entities/entities"
import {Router} from "express"
import {CategoryData, CategoryRepository} from "../database/repositories/category.repository";
import {body} from "express-validator";
const router:Router = Router();

const validations = [
    body("name").exists().isString().notEmpty(),
    body("recordId").isInt(),
]

router.post('/addcategory', validations,function(req: { body: { name: any; recordId: any }; }, res: { send: (arg0: string) => void; }) {
    if (!req.body.name){
        return res.send('no name provided')
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
