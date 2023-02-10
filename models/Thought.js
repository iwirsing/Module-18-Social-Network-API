const { Schema, model } = require('mongoose');
//import time format function at utils helper
const format_date=require("../utils/helpers");


//create reaction Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: function () { return new ObjectId()},
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
            get: (createdAtVal)=>format_date(createdAtVal),
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
            get: (createdAtVal)=>format_date(createdAtVal),
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
const Thought = model('thought', thoughtSchema);


module.exports = Thought;
