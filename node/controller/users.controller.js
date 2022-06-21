const User = require('../models/users.model');

async function getAllUsers(req, res, next) {
    let users;
    try{
        users = await User.getAllUsers();
    } catch (error) {
        return next(error);
    }

    res.json({
        users: users,
    });
}

async function addUser(req, res, next) {
    const UserName = req.body.newName;
    const UserEmail = req.body.newEmail;
    const UserPassword = req.body.newPassword;

    const user = new User(UserName, UserEmail, UserPassword);

    let insertedId;

    try{
        const result = await user.save();
        insertedId = result.insertedId;
    } catch (error) {
        return next(error);
    }

    user.id = insertedId.toString();

    res.json({
        message: 'Added user successfully!',
        createdUser: user
    });
}

async function updateUser(req, res, next) {
    const userId = req.params.id;
    const newUserName = req.body.newName;
    const newUserEmail = req.body.newEmail;
    const newUserPassword = req.body.newPassword;

    const user = new User(newUserName, newUserEmail, newUserPassword, userId);

    try{
        await user.save();
    } catch(error) {
        return next(error);
    }

    res.json({
        message: 'Update user successfully!',
        updateUser: user
    });
}

async function deleteUser(req, res, next) {
    const userId = req.params.id;

    const user = new User(null, null, null, userId);

    try{
        await user.delete();
    } catch(error) {
        return next(error);
    }

    res.json({
        message: 'Delete user successfully!'
    });
}

module.exports = {
    getAllUsers: getAllUsers,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};