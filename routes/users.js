const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//UPDATE
router.put("/posts", async(req, res) =>{
    if(req.body.userId === req.params.id){
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set : req.body,
        },{new:true});
        res.status(200).json(updatedUser);
    }catch (err){
        res.status(500).json(err);
    }
}else{
    res.status(401).json("you can update only your account");
}
});

//DELETE
router.delete("/posts", async(req, res) =>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
    try{
        await Post.deleteMany({username: user.username});
        await User.findByIdAndDelete(req.params.id)
       res.status(200).json("User has been deleted..");
    }catch (err){
        res.status(500).json(err);
    }
    }catch(err){
        res.status(404).json("User not found")
    }
}else{
    res.status(401).json("you can delete only your account");
}
});

//GET USER
router.get("/posts", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
        }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;