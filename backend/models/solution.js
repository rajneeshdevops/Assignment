const {DataTypes, ForeignKeyConstraintError} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Problem = require('./problems');

const Solution = sequelize.define('Solution',{
    description: {
        type: DataTypes.TEXT,
        allowNull: false},
    upvotes: {type: DataTypes.INTEGER, 
        defaultValue: 0
    },
});

User.hasMany(Solution, {foreignKey: "userId"});
Solution.belongsTo(User, {foreignKey: "userId"});

Problem.hasMany(Solution, {foreignKey: "problemId"});
Solution.belongsTo(Problem, {foreignKey: "problemId"});
module.exports = Solution;

