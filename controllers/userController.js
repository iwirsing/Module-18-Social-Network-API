const User =require('../models/User');
const Thought =require('../models/Thought');

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
        .populate('friends')
        .populate('thoughts')
        .then((user)=>
            //ternary that checks if user exists or not
            !user? res.status(404).json({ message: 'No user with that ID' }): res.json(user)
        )
        // .catch((err)=>res.status(500).json(err));
    },
    //create or post a new User
    postNewUser(req,res){
        User.create(req.body)
            .then((user)=> res.json(user))
            .catch((err)=>res.status(500).json(err));
    },
    
    //update new user using _id
    updateUser (req,res) {
        console.log('Updating User with:');
        console.log(req.body);
        User.findOneAndUpdate(
            {_id: req.params.userId}, //filter for finding
            {username: req.body.username,
            email: req.body.email}, //the items to update
            {new: true,             //options:returns modified user
            runValidators: true},   //options: runs the validator from the model
        ).then((user)=>
                !user? res.status(404).json({message: 'There is no user found with that ID.'})
                : res.json(user)
        ).catch((err)=> res.status(500).json(err));

    },
    
    //delete user using _id and remove associated thoughts when deleted
    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
            .then((user)=>{
                !user ? res.status(404).json({message: 'There is no user with that ID'})
                //if user deleted, delete the thought/s that belong to the user
                : Thought.deleteMany({_id: {$in: user.thoughts}})}
                )
                .then(()=> res.json({message: 'User and associated thoughts successfully deleted!'}))
                .catch((err)=>res.status(500).json(err));
    },

    //add friend
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id:params.userId},
            {$addToSet: {friends: params.friendId}},
            {new: true})
            .then((user)=>{
                if(!user) return res.status(404).json({message: "No user with this ID"});
                res.json(user);
            })
            .catch((err)=>res.status(500).json(err));
            
    },
    //remove friend
    removeFriend({params},res){
        User.findOneAndUpdate(
            {_id:params.userId},
            {$pull: {friends: params.friendId}},
            {new: true})
            .then((user)=>{
                if(!user) return res.status(404).json({message: "No user with this ID"});
                res.json(user);
            })
            .catch((err)=>res.status(500).json(err));
    }
};