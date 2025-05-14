require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const agentRoutes = require('./routes/agentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middleware/errorHandler');  // Custom error handler middleware

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));


