const router = require('express').Router();
const {
    getUsers, getSingleUser, postNewUser,
} = require('../../controllers/userController');

//this is for the route '/api/users'
router.route('/').get(getUsers).post(postNewUser);

//this is to get a single user through '/api/users/:userId'
router.route('/:userId').get(getSingleUser);

module.exports=router;