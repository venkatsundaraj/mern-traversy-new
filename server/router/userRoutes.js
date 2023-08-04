const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {authHandler} = require('../middleware/authMiddleware')

router.post('/register',userController.registerHandler)
router.post('/login',userController.logninHandler)
router.get('/get-user', authHandler, userController.getMeHandler)


module.exports = router