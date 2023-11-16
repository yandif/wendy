const Koa = require('koa');

const port = 3000;
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
