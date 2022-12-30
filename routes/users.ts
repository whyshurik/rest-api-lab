import * as entities from "../database/entities/entities"
import {Router} from "express"
import {UserData, UserRepository} from "../database/repositories/user.repository";
import {body} from "express-validator";
const router:Router = Router();

const validations = [
    body("userId").exists().isInt().notEmpty(),
    body("name").exists().isString().notEmpty(),
    body("balance").exists().isInt().notEmpty(),
    body("record").exists().isInt().notEmpty(),
]

/* GET users listing. */
router.post('/adduser', validations,function(req, res) {
    if (!req.body.userId){
        return res.send('no id provided')
    }
    if (!req.body.name){
        return res.send('no name provided')
    }
    if (!req.body.balance){
        return res.send('no name provided')
    }
    if (!req.body.record){
        return res.send('no name provided')
    }
    const obj:UserData = {
        userId: req.body.userId,
        name: req.body.name,
        balance: req.body.balance,
        record: req.body.record
    }
    UserRepository.createUser(obj)
    res.send('users respond with a resource');
});
router.get('/', function(req, res) {
    res.send(JSON.stringify([...entities.users]));
});
router.get('/getuser/:userid', function(req, res) {
    const userdata = Array.from(entities.records).filter((record:any) => record.userId === req.params.userid);
    res.send(JSON.stringify(userdata));
});
export {router}
