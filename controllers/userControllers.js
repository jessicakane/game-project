const { createNewUser, addUserModel } = require('../models/userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

//jessie's test
const createNewUserController = async (req, res) => {
  try {
    const newUser = req.body;
    await createNewUser(newUser);
    res.status(201).json({ message: 'New user added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
async function signup(req, res) {
  // console.log(req.body);
  try {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      rePassword: req.body.rePassword,
    };

    const id = await addUserModel(newUser);
    if (id) {
      res.send({ ok: true, id: id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

module.exports = { createNewUserController, signup };
