const express = require('express');
const { getDistributedTasks } = require('../controller/distributedTaskController');
const router = express.Router();

router.get('/', getDistributedTasks);

module.exports = router;
