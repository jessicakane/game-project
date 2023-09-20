const { User } = require('../schemas/usersSchema');

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

async function updateUserModel(newInfo) {
    try {
        const {userId, highScore} = newInfo;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { highScore } }, 
            { new: true } 
          );
          return updatedUser
    } catch (error) {
        console.error(error)
        return false;
    }
}

module.exports = { updateUserModel, getUserByEmailModel, addUserModel };
