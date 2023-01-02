import * as entities from "../database/entities/entities"
import {Router} from "express"
import {UserData, UserRepository} from "../database/repositories/user.repository";
import {body, validationResult} from "express-validator";
const router:Router = Router();

const validations = [
    body('name').exists().isString().notEmpty(),
    body('balance').isInt().optional(),
    body('record').isInt().optional()
]

/* GET users listing. */
router.post('/adduser', validations,function(req: { body: { name: string; balance: [], record: [] }; },res ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const obj:UserData = {
        name: req.body.name,
        balance: req.body.balance,
        record: req.body.record
    }
    UserRepository.createUser(obj)
    res.send('users respond with a resource');
});
router.get('/', async function (_req: any, res: { send: (arg0: string) => void; }) {
    res.send(await UserRepository.getAllUsers());
});
router.get('/getuser/:userid', function(req, res) {
    const userdata = Array.from(entities.records).filter((record:any) => record.userId === req.params.userid);
    res.send(JSON.stringify(userdata));
});
export {router}
