const express = require('express');
const router = new express.Router();
const users = require('../controllers/users.js');
 
router.route('/users/:id?')
  .get(users.get)
  .post(users.post)
  .put(users.put)
  .delete(users.delete);
 
module.exports = router;