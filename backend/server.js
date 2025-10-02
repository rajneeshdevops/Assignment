const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize, syncDB } = require('./models');

const authRoutes = require('./routes/authRoutes');
const problemRoutes = require("./routes/problemRoutes");
const solutionRoutes = require("./routes/solutionRoutes");
const commentRoutes = require("./routes/commentRoutes");


const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint to verify server and DB connectivity
app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({ status: 'ok', db: 'connected' });
  } catch (err) {
    return res.status(500).json({ status: 'error', db: 'disconnected', message: err.message });
  }
});

app.use('/api/auth', authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/problems/:problemId/solutions", solutionRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;

// Initialize DB sync only in local development; avoid on Vercel serverless
if (!process.env.VERCEL) {
  syncDB().catch((err) => console.error('DB sync error:', err));
}

// Export handler for Vercel serverless; use app.listen only in local development
if (process.env.VERCEL) {
  module.exports = (req, res) => app(req, res);
} else {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}