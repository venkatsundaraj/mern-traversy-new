const express = require('express')
const router = express.Router()
const allGoals = require('../controllers/goalController')
const {authHandler} = require('../middleware/authMiddleware')

router.get('/get-goals', authHandler, allGoals.getGoals)
router.post('/set-goals', authHandler, allGoals.setGoals)
router.post('/update-goals/:id', authHandler,  allGoals.updateGoals)
router.get('/delete-goals/:id',authHandler, allGoals.deleteGoals)

module.exports = router