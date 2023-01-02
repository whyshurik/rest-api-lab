import createError from "http-errors"
import * as express from "express"
import {join} from "path"
import * as cookieParser from "cookie-parser"
import * as indexRouter from "./routes/index"
import * as usersRouter from "./routes/users"
import * as categoriesRouter from "./routes/categories"
import * as recordsRouter from "./routes/records"
import * as balancesRouter from "./routes/balances"
const app = express();

// view engine setup

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

console.log(indexRouter.router)
app.use('/', indexRouter.router)
app.use('/users', usersRouter.router);
app.use('/categories', categoriesRouter.router);
app.use('/records', recordsRouter.router);
app.use('/balances', balancesRouter.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;

