const db = require('../../db/connection');
const { validateNameLength } = require('./model');

const index = (req, res) => {
  const query = 'SELECT * FROM akun_user';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json({ akun_user: results });
  });
};
const create = async (req, res) => {
  const { username, password } = req.body;

  if (!validateNameLength(username)) {
    return res.status(400).json({
      error:
        'Panjang username harus antara 8 dan 15 karakter dan tidak mengandung spasi.',
    });
  }

  if (!username || !password) {
    return res.status(400).json({
      error: 'Username dan password harus diisi.',
    });
  }

  const query = 'INSERT INTO akun_user (username, password) VALUES (?, ?)';

  try {
    const result = await new Promise((resolve, reject) => {
      db.query(query, [username, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return res.status(201).json({
      message: 'Akun berhasil dibuat',
      userId: result.insertId,
    });
  } catch (error) {
    if (error.sqlMessage && error.sqlMessage.includes('username')) {
      return res.status(400).json({
        error: 'Username sudah digunakan. Pilih username lain.',
      });
    }
    return res.status(500).json({
      error: 'Terjadi kesalahan pada server. Silakan coba lagi.',
    });
  }
};

const find = async (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId) || parseInt(userId) <= 0) {
    return res.status(400).json({ error: 'ID pengguna tidak valid.' });
  }

  const query = 'SELECT * FROM akun_user WHERE id_user = ?';

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }

    res.json(results[0]);
  } catch (error) {
    console.error('Error during asynchronous operation:', error);
    res
      .status(500)
      .json({ error: 'Terjadi kesalahan pada server. Silakan coba lagi.' });
  }
};

const destroy = async (req, res) => {
  const userId = req.params.id_user;

  if (!userId || isNaN(userId) || parseInt(userId) <= 0) {
    return res.status(400).json({ error: 'ID pengguna tidak valid.' });
  }

  try {
    const getUsernameQuery = 'SELECT username FROM akun_user WHERE id_user = ?';
    const usernameResult = await new Promise((resolve, reject) => {
      db.query(getUsernameQuery, [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (usernameResult.length === 0) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }

    const username = usernameResult[0].username;

    const deleteQuery =
      'DELETE FROM akun_user WHERE id_user = ? AND username = ?';
    const deleteResult = await new Promise((resolve, reject) => {
      db.query(deleteQuery, [userId, username], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }

    return res
      .status(200)
      .json({ message: `Pengguna ${username} berhasil dihapus.` });
  } catch (error) {
    console.error('Error during asynchronous operation:', error);
    return res
      .status(500)
      .json({ error: 'Terjadi kesalahan pada server. Silakan coba lagi.' });
  }
};

module.exports = {
  index,
  find,
  create,
  destroy,
};
