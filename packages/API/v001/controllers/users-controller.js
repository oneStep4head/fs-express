const router = require('express').Router();
const db = require('../../../db/db');
const { validate } = require('jsonschema');

const newUser = name => ({
  id: String(Math.random()
    .toString(16)
    .split('.')[1]),
  name,
});

// router.use('/:id', (req, res, next) => {
//   const task = db.get('tasks')
//     .find({ id: req.params.id })
//     .value();
//
//   if (!task) {
//     next(new Error('CAN_NOT_FIND_TASK'));
//   }
// });

// GET /users
router.get('/', (req, res) => {
  const users = db.get('users').value();

  res.json({ status: 'OK', data: users });
});

// GET /users/:id
router.get('/:id', (req, res) => {
  const user = db
    .get('users')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: user });
});

// GET /users/current
router.get('/current/user', (req, res) => {
  const user = db
    .get('users')
    .find({ id: req.cookies.userId })
    .value();

  res.json({ status: 'OK', data: user });
});

// GET /users/name/:userName
router.get('/name/:userName', (req, res) => {
  const user = db
    .get('users')
    .find({ name: req.params.userName })
    .value();

  res.json({ status: 'OK', data: user });
});

// POST /users
router.post('/', (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: { text: { type: 'string' } },
  //   required: ['text'],
  //   additionalProperties: false,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

  const user = newUser(req.body.userName);

  console.log(user);

  db.get('users')
    .push(user)
    .write();

  res.json({ status: 'OK', data: user });
});

module.exports = router;
