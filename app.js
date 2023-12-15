const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//ROUTER
const akun_userRouter = require('./app/api/akun_user/router');
const produkRouter = require('./app/api/produk/router');

const v1 = '/api/v1/';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome chickfarm',
  });
});

app.use(v1, akun_userRouter);
app.use(v1, produkRouter);

module.exports = app;
