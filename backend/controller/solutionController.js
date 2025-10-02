const {Solution, User, problem} = require('../models');

exports.addSolution = async (req, res) => {
    try{
        const {problemId, description} = req.body;
        const solution = await Solution.create({
            description,
            problemId,
            userId: req.user.id,
        });
        res.json(solution);
    } catch (err){
        res.status(500).json({error: "Error adding solution"}); 
    }
};

exports.getSolutions = async (req, res) => {
    try{
        const{problemId} = req.params;
        const solutions = await Solution.findAll({
            where: {problemId},
            include: [{model: User, attributes: ["id", "username"]}],
            order: [["upvotes", "DESC"]],
        });
        res.json(solutions);
    } catch (err){
        res.status(500).json({error: "Error fetching solutions"});  
    }
};

exports.upvoteSolution = async (req, res) => {
    try{
        const {solutionId} = req.params;
        const solution = await Solution.findByPk(solutionId);
        if(!solution) return res.status(404).json({error: "Solution not found"});

        solution.upvotes += 1;
        await solution.save();
        res.json(solution);
    } catch (err){
        res.status(500).json({error: "Error upvoting solution"});   
    }
};