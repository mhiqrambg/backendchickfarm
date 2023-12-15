const db = require('../../db/connection');
const { validateNameLength } = require('./model');
const { generateRandomNumber } = require('../../service/service');

const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM akun_user';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createUsers = async (req, res) => {
  const { username, password } = req.body;

  // Validasi panjang nama
  if (!validateNameLength(username)) {
    return res.status(400).json({
      error: 'Panjang nama harus antara 3 dan 25 karakter.',
    });
  }

  // Pastikan username dan password diisi
  if (!username || !password) {
    return res.status(400).json({
      error: 'Username dan password harus diisi.',
    });
  }

  const query = 'INSERT INTO akun_user (username, password) VALUES (?, ?)';

  try {
    const result = await new Promise((resolve, reject) => {
      // Eksekusi query dengan parameter username dan password
      db.query(query, [username, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // Tanggapan berhasil jika tidak ada kesalahan
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

const getUserById = async (req, res) => {
  const userId = req.params.id_users;
  console.log(userId);

  if (!userId || isNaN(userId) || parseInt(userId) <= 0) {
    return res.status(400).json({ error: 'ID pengguna tidak valid.' });
  }

  const query = 'SELECT * FROM akun_user WHERE id_user = ?';

  try {
    const results = await new Promise((resolve, reject) => {
      // Eksekusi query dengan parameter userId
      db.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length === 0) {
      // Jika tidak ada hasil (user tidak ditemukan)
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }

    // Kirim data pengguna yang ditemukan sebagai respons
    res.json(results[0]);
  } catch (error) {
    // Tangani kesalahan dari operasi asynchronous
    console.error('Error during asynchronous operation:', error);
    res
      .status(500)
      .json({ error: 'Terjadi kesalahan pada server. Silakan coba lagi.' });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id_user;

  // Validasi ID pengguna
  if (!userId || isNaN(userId) || parseInt(userId) <= 0) {
    return res.status(400).json({ error: 'ID pengguna tidak valid.' });
  }

  try {
    // Dapatkan username berdasarkan ID pengguna
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

    // Periksa apakah pengguna dengan ID tersebut ditemukan
    if (usernameResult.length === 0) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }

    const username = usernameResult[0].username;

    // Hapus pengguna berdasarkan ID dan username
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

    // Periksa apakah pengguna berhasil dihapus
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }

    // Tanggapan berhasil jika tidak ada kesalahan
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
  getAllUsers,
  getUserById,
  createUsers,
  deleteUserById,
};
