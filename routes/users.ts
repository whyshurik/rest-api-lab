import * as entities from "../database/entities/entities"
import {Router} from "express"
const router:Router = Router();

/* GET users listing. */
router.post('/adduser', function(req, res) {
    if (!req.body.id){
        return res.send('no id provided')
    }
    if (!req.body.name){
        return res.send('no name provided')
    }
    entities.users.add(req.body)
    res.send('users respond with a resource');
});
router.get('/', function(req, res) {
    res.send(JSON.stringify([...entities.users]));
});
export {router}
