const router = require('express').Router();
const apiV001 = require('./v001/api-v001');

router.use('/v001', apiV001);

module.exports = router;
