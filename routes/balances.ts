import * as entities from "../database/entities/entities"
import {Router} from "express"
import {body} from "express-validator";
import {BalanceData, BalanceRepository} from "../database/repositories/balance.repository";
import {UserRepository} from "../database/repositories/user.repository";
const router:Router = Router();

const validations = [
    body("money").exists().isString().notEmpty(),
    body("userId").exists().isInt().notEmpty(),
]

router.post('/addbalance', validations,function(req: { body: { money: any; userId: any }; }, res: { send: (arg0: string) => void; }) {
    if (!req.body.money){
        return res.send('no name provided')
    }
    if (!req.body.userId){
        return res.send('no record provided')
    }
    const obj:BalanceData = {
        money: req.body.money,
        user: req.body.userId,
    }
    BalanceRepository.createBalance(obj)
    res.send('balance successfully added');
});
router.get('/', async function (_req: any, res: { send: (arg0: string) => void; }) {
    res.send(await BalanceRepository.getAllBalances());
});
export {router}