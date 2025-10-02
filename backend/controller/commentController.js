const {Comment, User, Solution} = require('../models');

exports.addComment = async (req, res) => {
    try{
        const {solutionId, text} = req.body;
        const comment = await Comment.create({
            text,
            solutionId,
            userid: req.user.id,
        });
        res.json(comment);
    }catch (err){
        res.status(500).json({error: "Error adding comment"});  
    }
};

exports.getComments = async (req, res) => {
    try{
        const {solutionId} = req.params;
        const comments = await Comment.findAll({
            where: {solutionId},
            include: [{model: User, attributes: ["id", "username"]}],
            order: [["createdAt", "ASC"]],
        });
        res.json(comments);
    } catch (err){
        res.status(500).json({error: "Error fetching comments"});   
    }
};
