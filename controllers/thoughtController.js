const Thought=require('../models/Thought');

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
        ).catch((err)=>res.status(500).json(err));
    },
    //create a single thought
    postNewThought(req,res) {
        //first, create thought
        Thought.create(req.body)
            //then add thought to user
            .then((thought)=>{
                return User.findOneAndUpdate(
                    {_id:req.body}
                
                )})
    }

}