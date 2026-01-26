
const { Employee } = require('../models');

exports.getAll = async (req, res) => {
  const employees = await Employee.findAll({ where: { is_active: true } });
  res.render('dashboard', { employees });
};

exports.renderAdd = (req, res) => {
  if (req.user.role !== 'manager') return res.status(403).send('Forbidden');
  res.render('add-employee');
};

exports.create = async (req, res) => {
  if (req.user.role !== 'manager') return res.status(403).send('Forbidden');
  await Employee.create({
    ...req.body,
    created_by: req.user.username, // Audit Trail
    is_active: true
  });
  res.redirect('/');
};

exports.renderEdit = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  res.render('edit-employee', { employee });
};

exports.update = async (req, res) => {
  await Employee.update({
    ...req.body,
    updated_by: req.user.username // Audit Trail
  }, { where: { id: req.params.id } });
  res.redirect('/');
};

exports.softDelete = async (req, res) => {
  if (req.user.role !== 'manager') return res.status(403).send('Forbidden');
  await Employee.update({ 
    is_active: false,
    updated_by: req.user.username 
  }, { where: { id: req.params.id } });
  res.redirect('/');
};