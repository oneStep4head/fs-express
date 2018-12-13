const router = require('express').Router();
const usersController = require('./controllers/users-controller');
const metricsController = require('./controllers/metrics-controller');

// router.use('/users', usersController);
router.use('/metrics', metricsController);

module.exports = router;
