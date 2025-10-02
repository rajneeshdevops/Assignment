const {Problem, User } = require("../models");

exports.createProblem = async (req, res) => {
    try{
        const {title, description, location, imageUrl} = req.body;
        const problem = await Problem.create({
            title,
            description,
            location,
            imageUrl,
            userId: req.user.id,
        });
        res.json(problem);
    } catch (err){
        res.status(500).json({error: "Error creating problem"});
    }
};

exports.getProblems = async (req, res) => {
    try{
        const problems = await Problem.findAll({
            include: [{model: User, attributes: ["id", "username"]}],
            order: [["createdAt", "DESC"]],
        });
        res.json(problems);
    } catch (err){
        res.status(500).json({error: "Error fetching problems"});
    }
};

exports.getProblemById = async (req, res) => {
    try{
        const { id } = req.params;
        const problem = await Problem.findByPk(id, {
            include: [{model: User, attributes: ["id", "username"]}],
        });
        if (!problem) {
            return res.status(404).json({error: "Problem not found"});
        }
        res.json(problem);
    } catch (err){
        res.status(500).json({error: "Error fetching problem"});
    }
};