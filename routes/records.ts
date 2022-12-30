import * as entities from "../database/entities/entities"
import {Router} from "express"
import {body} from "express-validator";
import {RecordData, RecordRepository} from "../database/repositories/record.repository";
const router:Router = Router();

const validations = [
    body("recordId").exists().isInt().notEmpty(),
    body("money").exists().isNumeric().notEmpty(),
    body("user").exists().isInt().notEmpty(),
    body("category").exists().isInt().notEmpty(),
]

router.post('/addrecord', validations, function(req, res) {
    if (!req.body.recordId){
        return res.send('no id provided')
    }
    if (!req.body.money){
        return res.send('no user id provided')
    }
    if (!req.body.user){
        return res.send('no category id provided')
    }
    if (!req.body.category){
        return res.send('no cost provided')
    }
    const obj:RecordData = {
        recordId: req.body.recordId,
        recordDate: new Date(),
        money: req.body.money,
        user: req.body.user,
        category: req.body.category
    }
    RecordRepository.createRecord(obj);
    res.send('records respond with a resource');
});
router.get('/', function(req, res) {
    res.send(JSON.stringify([...entities.records]));
});

export {router}
