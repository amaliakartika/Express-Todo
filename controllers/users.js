const { User } = require('../models/user'); // Pastikan path sesuai dengan struktur proyek Anda

const UserController = {
  // Contoh fungsi untuk mendapatkan semua pengguna
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Contoh fungsi untuk mendapatkan satu pengguna berdasarkan ID
  getUserById: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Contoh fungsi untuk membuat pengguna baru
  createUser: async (req, res) => {
    const { username, password, role } = req.body;

    try {
      const newUser = await User.create({
        username,
        password,
        role,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Contoh fungsi untuk mengupdate informasi pengguna
  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { username, password, role } = req.body;

    try {
      const user = await User.findByPk(userId);

      if (user) {
        await user.update({
          username,
          password,
          role,
        });

        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Contoh fungsi untuk menghapus pengguna
  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findByPk(userId);

      if (user) {
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = UserController;