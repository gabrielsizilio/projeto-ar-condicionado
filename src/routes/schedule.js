const express = require('express');
const ScheduleController = require('../controllers/ScheduleController');
const router = express.Router()

router.get('/:sala_id', ScheduleController.index)
router.post('/:sala_id/store', ScheduleController.store)
router.post('/:sala_id/remove', ScheduleController.remove)

module.exports = router;