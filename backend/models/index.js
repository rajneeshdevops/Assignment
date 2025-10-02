const sequelize = require('../config/db');
const User = require('./user');
const Problem = require('./problems');
const Solution = require('./solution');
const Comment = require('./comment');

const syncDB = async () => {
    try {
        await sequelize.sync({alter: true});
        console.log("All models were synchronized successfully.");
    }
    catch (error){
        console.error("Error synchronizing models:", error);
    }
};

module.exports = {sequelize, User, Problem, Solution, Comment, syncDB};