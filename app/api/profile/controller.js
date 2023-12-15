const db = require('../../db/connection');
const util = require('util');

const dbQuery = util.promisify(db.query).bind(db);

const getProfileById = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const query = `
      SELECT akun_user.id_user, akun_user.username, profile.name_user, profile.alamat, profile.no_telepon
      FROM akun_user
      INNER JOIN profile ON akun_user.id_user = profile.id_user
      WHERE akun_user.id_user = ?
    `;

    const results = await dbQuery(query, user_id);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
const updateProfile = (req, res) => {
  const user_id = req.params.user_id;
  const { name_user, alamat, no_telepon } = req.body;

  const query = `
    UPDATE profile
    SET name_user = ?, alamat = ?, no_telepon = ?
    WHERE id_user = ?
  `;

  db.query(query, [name_user, alamat, no_telepon, user_id], (err, results) => {
    if (err) {
      throw err;
    }

    res.json({ message: 'Profil berhasil diperbarui' });
  });
};

module.exports = {
  getProfileById,
  updateProfile,
};
