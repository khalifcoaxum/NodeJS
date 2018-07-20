const users = require('../api/users.js');

async function get(req, res, next) {
  try {
    const context = {};
    const rows = await users.find(context);
    
    context.id = parseInt(req.params.id, 10);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;
function getEmployeeFromRec(req) {
  const employee = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };
  return employee;
}

async function post(req, res, next) {
  try {
    let employee = getEmployeeFromRec(req);
    employee = await users.create(employee);

    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;
async function put(req, res, next) {
  try {
    let employee = getEmployeeFromRec(req);

    employee.employee_id = parseInt(req.params.id, 10);

    employee = await users.update(employee);

    if (employee !== null) {
      res.status(200).json(employee);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.put = put;
async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await users.delete(id);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.delete = del;
