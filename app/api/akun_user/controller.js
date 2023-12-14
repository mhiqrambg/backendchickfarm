const db = require('../../db/connection');

const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM akun_user';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createUsers = function (req, res) {
  var id = req.body.id_user;
  var name = req.body.username;
  var password = req.body.password;

  connection.query(
    'INSERT INTO akun_user (id, name, password) VALUES (?, ?, ?)',
    [id, name, password],
    function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Assuming you have a `response` object with an `ok` function defined
        response.ok('Berhasil Menambahkan Data!', res);
      }
    }
  );
};

const getUserById = (req, res) => {
  const userId = req.params.id_user;
  const query = 'SELECT * FROM akun_user WHERE id_user = ?';
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
};

const getUserByName = (req, res) => {
  const username = req.params.username;
  const query = 'SELECT * FROM akun_user WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUsers,
  getUserByName,
};
