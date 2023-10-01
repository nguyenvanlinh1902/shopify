const Koa = require('koa');
const app = new Koa();
const { koaBody } = require('koa-body');
const routes = require('./src/routes/routes.js');
const cors = require('@koa/cors');
// response
app.use(cors({
    origin: '*',
}))
app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());
app.listen(5000);