const {Schema, model} = require('mongoose');

//Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            max_length: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/," Please enter a valid email address",]
        },
        thoughts: 
        [{
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends:
            [{
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        //virtuals to count friends
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

//create a virtual property to count a user's friends
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

//initialize the user model
const User = model('User',userSchema);

module.exports = User;
