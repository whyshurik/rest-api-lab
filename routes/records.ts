import * as entities from "../database/entities/entities"
import {Router} from "express"
const router:Router = Router();

router.post('/addrecord', function(req, res) {
    if (!req.body.id){
        return res.send('no id provided')
    }
    if (!req.body.userId){
        return res.send('no user id provided')
    }
    if (!req.body.categoryId){
        return res.send('no category id provided')
    }
    if (!req.body.cost){
        return res.send('no cost provided')
    }
    const obj = {...req.body, date: new Date()}
    entities.records.add(obj)
    res.send('records respond with a resource');
});
router.get('/', function(req, res) {
    res.send(JSON.stringify([...entities.records]));
});
router.get('/getuser/:userid', function(req, res) {
    const userdata = Array.from(entities.records).filter((record:any) => record.userId === req.params.userid);
    res.send(JSON.stringify(userdata));
});
router.get('/getcategory', function(req, res) {
    const userid = req.query.userid;
    const categoryid = req.query.categoryid;
    const userdata = Array.from(entities.records).filter((record:any) => record.userId === userid && record.categoryId === categoryid);
    res.send(JSON.stringify(userdata));
});
export {router}
