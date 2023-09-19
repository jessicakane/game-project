const { User } = require('../schemas/usersSchema');

//jessie's test
async function createNewUser(userData) {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw error;
  }
}

// mongoDB
async function getUserByEmailModel(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    console.log(err);
  }
}
async function addUserModel(newUser) {
  try {
    const user = new User(newUser);
    await user.save();
    return user._id;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { createNewUser, getUserByEmailModel, addUserModel };
