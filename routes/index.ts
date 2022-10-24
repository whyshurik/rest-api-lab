import {Router} from "express"
const router:Router = Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Слава Україні!' });
});

export {router};
