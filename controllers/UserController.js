const {Thought,User} = require('../models');

module.exports = {
    async  getUser(req, res) {
        try {
          const users = await User.find({});
          res.json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      

      async  getSingleUser(req, res) {
        try {
          const user = await User.findOne({_id: req.params.userId})
            .populate("thoughts")
            .populate("friends")
            .select("-__v");
          if (!user) {
            return res.status(404).json({ message: "No User find with that ID!" });
          }
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      
    async createUser(req,res){
            try {
              const user = await User.create(req.body);
              res.json(user);
            } catch (error) {
              res.status(500).json(error);
            }
    },
    async updateUser(req,res){
        try {
          const user = await User.findOneAndUpdate(
            {_id:req.params.userId},
            {$set:req.body},
            {runValidators:true,new:true}
        )
        res.json(user);
        } catch (error) {
          console.error(error);
        }
    },
    async deleteUser(req,res){
            try {
              const user = await User.findOneAndDelete({_id:req.params.userId});
              res.json(user);
            } catch (error) {
              res.status(500).json(error);
            }
    },
    async addFriend(req,res){
        try {
          const user = await User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet:{friends:req.params.friendId}},
            {runValidators:true, new:true}
        );
        res.json(user);
        } catch (error) {
          res.status(500).json(error);
        }
    },
   async deleteFriend(req,res){
  
        try {
          const user = await User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull:{friends:req.params.friendId}},
            {new:true}
        )
        res.json(user);
        } catch (error) {
          res.status(500).json(error);
        }
    }
    
}