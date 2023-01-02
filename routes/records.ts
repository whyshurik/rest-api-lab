import {Router} from "express"
import {body} from "express-validator";
import {RecordData, RecordRepository} from "../database/repositories/record.repository";
const router:Router = Router();

const validations = [
    body("money").exists().isNumeric().notEmpty(),
    body("user").exists().isInt().notEmpty(),
    body("category").exists().isInt().notEmpty(),
]

router.post('/addrecord', validations, function(req, res) {
    if (!req.body.money){
        return res.send('no money id provided')
    }
    if (!req.body.user){
        return res.send('no user id provided')
    }
    if (!req.body.category){
        return res.send('no category provided')
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
