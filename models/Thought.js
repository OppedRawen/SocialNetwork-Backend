const {Schema,model} = require('mongoose');
const reactions = require('./Reactions');
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type:String,
            required:true,
        },
        createdAt:{
            type: Date,
            default:Date.now(),
        },
        username:{
            type:String,
            required:true,
        },
        reactions:[reactions],
    },
    {
        toJSON:{
            virtuals:true,
        },
        id:false
    }
);

const Thought = model('thought',thoughtSchema);
module.exports = Thought;