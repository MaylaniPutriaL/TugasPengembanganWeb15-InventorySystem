const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.renderLogin = (req, res) => res.render('login', { error: null });

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { username: user.username, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    res.cookie('token', token, { httpOnly: true });
    return res.redirect('/');
  }
  res.render('login', { error: 'Username atau Password salah!' });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};