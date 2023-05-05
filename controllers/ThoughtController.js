const {User,Thought} = require('../models');

module.exports = {
    async getThought(req,res){
        try {
          const user = await Thought.find({});
          res.json(user);
        } catch (error) {
          console.error(error);
        }
    },
    async getSingleThought(req,res){
        try {
          const user = await Thought.findOne({_id:req.params.thoughtId})
          .select("-__v");
          res.json(user);
        } catch (error) {
          res.status(500).json(error);
        }
},
async  createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},

  async updateThought(req,res){
        try {
          const thought = await Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$set:req.body},
            {runValidators:true, New:true}
        );
        res.json(thought);
        } catch (error) {
          res.status(500).json(error);
        }
},
async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if(thought){
          await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
        }else{
          res.status(404).json({message:"No thought found with this id"});
        }
        res.json(thought);
      } catch (error) {
        res.status(500).json(error);
      }
  },
async  createReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
        res.json(thought);
      } catch (error) {
        res.status(500).json(error);
      }
  },
async  deleteReaction(req, res) {
      try {
        const thought = Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        );
        res.json(thought);
      } catch (error) {
        res.status(500).json(error);
      }
  },

}