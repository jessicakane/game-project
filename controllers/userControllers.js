const {
  createNewUser,
  addUserModel,
  getUserByEmailModel,
} = require('../models/userModels');
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
  console.log(req.body);
  try {
    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      rePassword: req.body.rePassword,
      highScore: req.body.highScore,
      isAdmin: req.body.isAdmin,
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
async function login(req, res) {
  console.log(req.body);
  console.log(req.body.password);
  const { password, email } = req.body; //email
  //query to DB to find user by email that is stored in in DB, getting the user
  try {
    const user = await getUserByEmailModel(email);
    console.log(req.body.password);
    console.log(user.password);
    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).send('Incorrect password');
      }
      if (err) {
        return res.status(500).send('Error comparing');
      }

      if (result) {
        console.log(user);

        const token = jwt.sign({ id: user.userId }, process.env.TOKEN_KEY, {
          expiresIn: '999h',
        });

        res.send({
          token: token,
        });
      }
    });
    // res.send('login success'); // will give me an error cannot send something after i sent already the headers
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

module.exports = { createNewUserController, signup, login };
