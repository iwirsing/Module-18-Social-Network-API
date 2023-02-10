const router = require('express').Router();
const {
    getUsers, getSingleUser, postNewUser, updateUser, deleteUser
} = require('../../controllers/userController');

//this is for the route '/api/users'
router.route('/').get(getUsers).post(postNewUser);

//this is to get a single user through '/api/users/:userId'
router.route('/:userId').get(getSingleUser);

//this is to update a single user through put request with 'api/users/:userId'
router.route('/:userId').put(updateUser);

//to delete single user
router.route('/:userId').delete(deleteUser);

//route to add friend

//route to delete friend

//router
module.exports=router