const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {syncDB} = require('./models');

const authRoutes = require('./routes/authRoutes');
const problemRoutes = require("./routes/problemRoutes");
const solutionRoutes = require("./routes/solutionRoutes");
const commentRoutes = require("./routes/commentRoutes");


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/problems/:problemId/solutions", solutionRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;

syncDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});