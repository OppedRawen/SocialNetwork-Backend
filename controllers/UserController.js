const {Thought,User} = require('../models');

module.exports = {
    getUser(req,res){
        User.find({})
            .then((user)=> res.json(user))
            .catch((err)=> res.status(500).json(err));
    },

    getSingleUser(req,res){
        User.findOne({_id:req.params.userId})
            .populate("thoughts")
            .populate("friends")
            .select("-__v")
            .then((user)=>
                !user
                    ?res.status(404).json({message: "No User find with that ID!"})
                    :res.json(user)
            )
            .catch((err)=>res.status(500).json(err));
    },
    createrUser(req,res){
        User.create(req.body)
            .then((user)=>res.json(user))
            .catch((err)=>{
                console.log(err);
                return res.status(500).json(err);
            });
    },
    delete(req,res){
        User.findOneAndDelete({_id:req.params.userId})
            .then((user)=>{
                !user
                    ?res.status(404).json({message:"No User find with this ID!"})
                    :Thought.deleteMany({_id:{$in: user.thoughts}})
            })
            .then((res)=>res.json({message: "Delete user and Thought"}))
            .catch((err)=>res.status(500).json(err));
    },
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet:{friends:req.params.friendId}},
            {runValidators:true, new:true}
        )
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>res.status(500).json(err));
    },
    deleteFriend(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull:{friends:req.params.friendId}},
            {new:true}
        ).then((user)=>res.json(user))
        .catch((err)=>res.status(500).json(err));
    }
    
}