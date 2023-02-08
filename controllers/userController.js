const User=require('../models/User');

module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
        .then((users)=> res.json(users))
        .catch((err)=> res.status(500).json(err));
    },
    //get a single user using it's _id and populated thought and friend data
    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId})
        .select('-__v') //remove the version key from the results
        .populate('thoughts')
        .populate('friends')
        .then((user)=>
            //ternary that checks if user exists or not
            !user? res.status(404).json({ message: 'No user with that ID' }): res.json(user)
        ).catch((err)=>res.status(500).json(err));
    },
    //create or post a new User
    postNewUser(req,res){
        User.create(req.body)
            .then((user)=> res.json(user))
            .catch((err)=>res.status(500).json(err));
    },
    //update new user using _id

    //delete user using _id and remove associated thoughts when deleted
};