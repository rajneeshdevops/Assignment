const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Solution = require("./solution");

const Comment = sequelize.define("Comment", {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Solution.hasMany(Comment, { foreignKey: "solutionId" });
Comment.belongsTo(Solution, { foreignKey: "solutionId" });

module.exports = Comment;