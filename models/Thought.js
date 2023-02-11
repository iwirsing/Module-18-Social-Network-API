const { Schema, model, Types } = require('mongoose');
//import time format function at utils helper
const formatDate=require("../utils/helpers");


//create reaction Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: function () { return Types.ObjectId()},
        },
        reactionBody: {
            type: String,
            required: [true, "What's your reaction?"],
            maxlength: 200,
        },
        username: {
            type: String,
            required: [true,"Even Anonymous is a username, please enter your username!"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal)=>formatDate(createdAtVal),
        },
    }
);


// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true,"Please share your thought."],
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal)=>formatDate(createdAtVal),
        },
        username: {
            type: String,
            required: [true,"Even Anonymous is a username, please enter your username!"],
        },
        //uses the reactionSchema as a subdocument to Thought
        reactions:[reactionSchema],      
    },  
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
      }
);

//create virtual property to count reaction
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//initialize thought model
const Thought = model('Thought', thoughtSchema);


module.exports = Thought;
