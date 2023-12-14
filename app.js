const express = require('express');
const app = express();
const port = 3000;

//ROUTER
const akun_userRouter = require('./app/api/akun_user/router');
const produkRouter = require('./app/api/produk/router');

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to api chickfarm',
  });
});

app.use('/api/akun_user', akun_userRouter);
app.use('/api/produk', produkRouter);
// app.use('');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
