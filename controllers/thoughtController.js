const Thought=require('../models/Thought');
const User=require('../models/User');

module.exports = {
    //get all thoughts
    getThoughts(req,res){
        Thought.find()
        .then((thoughts)=> res.json(thoughts))
        .catch((err)=>res.status(500).json(err));
    },
    //get a single thought
    getSingleThought(req,res){
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought)=>
            !thought?
                res.status(404).json({message: 'There is no thought with that ID'})
                : res.json(thought)    
        )
        .catch((err)=>res.status(500).json(err));
    },
    //create a single thought
    postNewThought(req,res) {
        //first, create thought
        Thought.create(req.body)
            //then add thought to user
            .then((thought)=>{
                return User.findOneAndUpdate(
                    {_id:req.params.userId},
                    {$addToSet: {thoughts: thought._id}},
                    {new: true}
                )
                .then((user)=>{
                    if(!user) return res.status(404).json({message: "No user with this ID"});
                    res.json(user);
                });
            })
            .catch((err)=>res.status(500).json(err));
    },
    //update Thought
    updateThought(req,res){
        //find thought and update it
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId}, //filter for finding thought
            {   $set: req.body}, //items to update, create if non existent
            {new:true, runValidators:true}, //options: runs validators according to schema and return modified thought
        ).then((thought)=>
            {
                if(!thought) return res.status(404).json({message: "No thought with this ID"});
                res.json(thought);
            })
        .catch((err)=>res.status(500).json(err));
    },
    //delete Thought
    deleteThought({params},res){
        Thought.findOneAndDelete({_id:params.thoughtId})
            .then((thought)=>{
                if(!thought) return res.status(404).json({message: "No thought found with this ID"});
                res.json(thought);
            })
            .catch((err)=>res.status(500).json(err));

    },
    //create or add reactions to thoughts
    addReaction(req,res){
        //create the reaction
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId}, //search criteria
            {$push: {reactions:req.body}}, //adds into array of reactions
            {new: true, runValidators: true},//options return updated thought with reaction with input validation according to schema
        ).then((thought)=>{
            if(!thought) return res.status(404).json({message:"No thought with this ID"});
            res.json(thought);
        })
        .catch((err)=>res.status(500).json(err));
    },
    //deleteReaction
    deleteReaction({params},res){
        //create the reaction
        Thought.findOneAndUpdate(
            {_id:params.thoughtId}, //search criteria
            {$pull: {reactions: {reactionId: params.reactId}}}, //adds into array of reactions
            {new: true },//options return updated thought 
        ).then((thought)=>{
            if(!thought) return res.status(404).json({message:"No thought with this ID"});
            res.json(thought);
        })
        .catch((err)=>res.status(500).json(err));
    },
};