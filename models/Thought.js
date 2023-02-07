const { Schema, model } = require('mongoose');


// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions:[Reaction],      
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

//create reaction Schema
const reactionSchema = new Schema(
    {
        reactionId:{
            
        }
    }
)

module.exports = Thought;
