const { Item } = require('../models');

exports.getAll = async (req, res) => {
  const items = await Item.findAll({ where: { is_active: true } });
  res.render('dashboard', { items });
};

exports.renderAdd = (req, res) => {
  if (req.user.role !== 'manager') return res.status(403).send('Forbidden');
  res.render('add-item');
};

exports.create = async (req, res) => {
  if (req.user.role !== 'manager') return res.status(403).send('Forbidden');
  await Item.create({
    ...req.body,
    created_by: req.user.username, // Audit Trail
    is_active: true
  });
  res.redirect('/');
};

exports.renderEdit = async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  res.render('edit-item', { item });
};

exports.update = async (req, res) => {
  await Item.update({
    ...req.body,
    updated_by: req.user.username // Audit Trail
  }, { where: { id: req.params.id } });
  res.redirect('/');
};

exports.softDelete = async (req, res) => {
  if (req.user.role !== 'manager') return res.status(403).send('Forbidden');
  await Item.update({ 
    is_active: false,
    updated_by: req.user.username 
  }, { where: { id: req.params.id } });
  res.redirect('/');
};