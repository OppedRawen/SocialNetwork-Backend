const {Schema,model,Types} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionID:{
            type:Schema.Types.ObjectId,
            default: new Types.ObjectId()
        },
        reactionBody:{
            type: Date,
            required:true,
            maxlength:280
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
            getters: true
        },
        id:false
    }
);

module.exports = reactionSchema;