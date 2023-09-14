const {createNewUser} = require('../models/userModels')

const createNewUserController = async(req, res) => {
    try {
      const newUser = req.body;
      await createNewUser(newUser);
      res.status(201).json({ message: 'New user added successfully' });
    } catch(error) {
      console.log(error);
      res.status(500).send(error.message)
    }
  }

  module.exports = {createNewUserController}