import * as entities from "../database/entities/entities"
import {Router} from "express"
const router:Router = Router();


router.post('/addcategory', function(req: { body: { id: any; name: any; }; }, res: { send: (arg0: string) => void; }) {
    if (!req.body.id){
        return res.send('no id provided')
    }
    if (!req.body.name){
        return res.send('no name provided')
    }
    entities.categories.add(req.body)
    res.send('categories respond with a resource');
});
router.get('/', function(_req: any, res: { send: (arg0: string) => void; }) {
    res.send(JSON.stringify([...entities.categories]));
});
export {router}
