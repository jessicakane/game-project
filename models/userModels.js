const { User } = require('../schemas/usersSchema');
const mongoose = require('mongoose');


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

async function getUserNameById(userId) {
    try {
    const ObjectId = mongoose.Types.ObjectId;
    const objectId = new ObjectId(userId);
    const user = await User.findOne({ _id: objectId }).select('userName');
    if (!user) {
        return null;
      }
    return user.userName;
    } catch (error) {
        console.error('Error fetching userName by ID:', error)
        throw error;
    }

}

module.exports = { updateUserModel, getUserByEmailModel, addUserModel, getUserNameById};
