const authcontroller = require('../controller/authcontroller');
import express from 'express';
const router = express.Router();

router.post('/login',authcontroller.login);
router.post('/register',authcontroller.register)

export default router;