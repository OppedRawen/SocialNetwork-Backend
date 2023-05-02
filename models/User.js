const {Schema,model} = require('mongoose');

const UserSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            
        },
        email:{
            type:String,
            required:true,
        },
        thoughts:{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
        friends:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
)