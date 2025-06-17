const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
      const { firstName, lastName, username, email, password, contactNumber, picture, role } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        contactNumber,
        picture,
        role
      });
  
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;
  
      res.status(201).json(userWithoutPassword);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = { ...req.body };
  
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }
  
      const [updated] = await User.update(updates, {
        where: { id }
      });
  
      if (updated) {
        const updatedUser = await User.findByPk(id);
        const userWithoutPassword = { ...updatedUser.toJSON() };
        delete userWithoutPassword.password;
        return res.json(userWithoutPassword);
      }
  
      res.status(404).json({ error: 'User not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) return res.json({ message: 'User deleted' });
    res.status(404).json({ error: 'User not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;
  
      res.json(userWithoutPassword);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };