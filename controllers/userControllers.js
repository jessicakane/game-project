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
  console.log(req.body.loginPassword); //loginFormHolder.password} from FE
  const { loginPassword, user } = req.body;

  try {
    bcrypt.compare(loginPassword, user.password, (err, result) => {
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
    // res.send("login success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

module.exports = { createNewUserController, signup };
