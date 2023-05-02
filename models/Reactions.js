const {Schema,model} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionID:{
            type:Schema.Types.ObjectId,
            default: new ObjectId
        },
        reactionBody:{
            type: Date,
            required:true,
        },
        username:{
            type:String,
            required:true,
        },
        createdAt:
        {
            type:Date,
            default: Date.now(),
            
        },
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