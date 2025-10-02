const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Problem = sequelize.define('Problem',{
    title: {
        type: DataTypes.STRING,
        allowNull: false},
    description: {
        type: DataTypes.TEXT,
        allowNull: false},
    location: {
        type: DataTypes.STRING,
        allowNull: false},
    imageUrl:{
        type: DataTypes.STRING,
    }
});

User.hasMany(Problem, {foreignKey: "userId"});
Problem.belongsTo(User, {foreignKey: "userId"});
module.exports = Problem;