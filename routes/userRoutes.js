const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');
const {
  passwordMatch,
  isNewUser,
  hashPwd,
  isExistingUser, // for login
  auth, //might not need auth
} = require('../middleware/usersMiddleware');

//jessie's test route
router.post('/createuser', userControllers.createNewUserController);

//lukas's signup
router.post(
  '/signup',
  /*validateBody(signupSchema)*/ passwordMatch,
  isNewUser,
  hashPwd,
  userControllers.signup
);

router.post(
  '/login',
  /*validateBody(signupSchema)*/ isExistingUser,
  userControllers.login
);

module.exports = router;
