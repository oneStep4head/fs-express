const router = require('express').Router();
const db = require('../../../db/db');
const { validate } = require('jsonschema');

// _id: "5c0aa2934541e54aaeb3742d"
// name: "test1"
// owner: "5c079cab37bb4912c7157855"
// data: []
// __v: 0

const newMetric = (name, owner) => ({
  id: String(Math.random()
    .toString(16)
    .split('.')[1]),
  name,
  owner,
  data: [],
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

// GET /metrics
router.get('/', (req, res) => {
  const metrics = db.get('metrics').value();

  res.json({ status: 'OK', data: metrics });
});

// GET /metrics/:id
router.get('/:id', (req, res) => {
  const metric = db
    .get('metrics')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: metric });
});

// POST /metrics
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

  const metric = newMetric(req.body.name, req.cookies.userId);

  console.log(metric);

  db.get('metrics')
    .push(metric)
    .write();

  res.json({ status: 'OK', data: metric });
});

// PATCH /metrics/:id
router.patch('/:id', (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: {
  //     text: { type: 'string' },
  //     isCompleted: { type: 'boolean' },
  //   },
  //   additionalProperties: false,
  //   minProperties: 1,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

  const metric = db
    .get('metrics')
    .find({ id: req.params.id })
    .assign(req.body)
    .value();

  db.write();

  res.json({ status: 'OK', data: metric });
});

// PUT A NEW DATA IN METRIC
router.post('/:id', (req, res) => {
  db.get('metrics')
    .find({ id: req.params.id })
    .get('data')
    .push(req.body.newValue)
    .write();

  const updatedMetric = db
    .get('metrics')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: updatedMetric });
});

// DELETE /metrics/:id
router.delete('/:id', (req, res) => {
  db.get('metrics')
    .remove({ id: req.params.id })
    .write();

  res.json({ status: 'OK' });
});

module.exports = router;
