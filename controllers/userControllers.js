const {addUserModel, getUserByEmailModel, updateUserModel} = require('../models/userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const mongoose = require('mongoose');

async function signup(req, res) {
    console.log(req.body);
    try {
        const newUser = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            rePassword: req.body.rePassword,
            highScore: req.body.highScore,
            isAdmin: req.body.isAdmin
        };

        const id = await addUserModel(newUser);
        if (id) {
            res.send({ok: true, id: id});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

async function login(req, res) {
    console.log(req.body);
    console.log(req.body.password);
    const {password, email} = req.body;
    // email
    // query to DB to find user by email that is stored in in DB, getting the user
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

                const token = jwt.sign({
                    id: user.userId
                }, process.env.TOKEN_KEY, {expiresIn: '999h'});

                res.status(200).json({token: token, userName: user.userName, highScore: user.highScore, userId: user._id.toString()});
            }
        });
        // res.send('login success'); // will give me an error cannot send something after i sent already the headers
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

async function updateUserScore(req, res) {
    try {
        const newInfo = req.body;

        if (! mongoose.Types.ObjectId.isValid(newInfo.userId)) {
            return res.status(400).json({error: 'Invalid userId'});
        }

        const user = await updateUserModel(newInfo)

        if (! user) {
            return res.status(404).json({error: 'User not found'});
        }

        return res.status(200).json({message: 'High score updated successfully', user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {
  
    signup,
    login,
    updateUserScore
};
