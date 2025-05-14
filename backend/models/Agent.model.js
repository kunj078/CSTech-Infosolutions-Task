const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true }, // Hashed
});

const Agent = mongoose.models.Agent || mongoose.model('Agent', agentSchema);

module.exports = Agent;
