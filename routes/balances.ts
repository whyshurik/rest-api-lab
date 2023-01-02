import {Router} from "express"
import {body, validationResult} from "express-validator";
import {BalanceData, BalanceRepository} from "../database/repositories/balance.repository";
const router:Router = Router();

const validations = [
    body("money").exists().isNumeric().notEmpty(),
    body("userId").exists().isInt().notEmpty()
]

router.post('/addbalance', validations,function(req: { body: { money: any; userId: any }; }, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
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