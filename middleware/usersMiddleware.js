const { getUserByEmailModel } = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function passwordMatch(req, res, next) {
  if (req.body.password !== req.body.rePassword) {
    return res.status(400).send('Passwords dont match');
  }
  next();
}

async function isNewUser(req, res, next) {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    return res.status(400).send('User with this email already exists');
  }
  next();
}

async function isExistingUser(req, res, next) {
  const user = await getUserByEmailModel(req.body.email);
  // console.log(req.body);
  if (user) {
    req.body.user = user;
    // console.log(req.body);
    next();
  } else {
    res.status(400).send('User with this email does not exist');
  }
}

function hashPwd(req, res, next) {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(400).send('Error hashing password');
    } else {
      req.body.password = hash;
      next();
    }
  });
}

function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Authorization headers required');
  }
  const token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    console.log(decoded);
    req.body.ownerId = decoded.id;
    next();
  });
}

//might not need it
function checkIfAdmin(req, res, next) {
  const { token } = req.cookies;
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    if (decoded.isAdmin) {
      req.body.isAdmin = decoded.isAdmin;
      next();
    } else {
      res.status(403).send('You do not have permission');
    }
  });
}
module.exports = {
  passwordMatch,
  isNewUser,
  hashPwd,
  isExistingUser,
  auth,
  checkIfAdmin,
};
