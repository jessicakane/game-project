const {User} = require('../schemas/usersSchema');

async function createNewUser(userData) {
    try {
      const user = await User.create(userData)
      return user;
    } catch (error) {
      throw error; 
    }
  }

module.exports = {createNewUser}