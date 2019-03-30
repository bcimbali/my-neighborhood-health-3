const db = require('../models');

module.exports = {
  findAll(req, res) {
    console.log('in the find all');
    res.json({ name: 'karen' });
  }
};
