const Agent = require('../models/Agent.model');
const bcrypt = require('bcrypt');

// Add agent
exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const existing = await Agent.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Agent with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, email, mobile, password: hashedPassword });
    await agent.save();

    res.status(201).json({ message: 'Agent added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding agent' });
  }
};

// Get all agents
exports.getAgents = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? {
          $or: [
            { name: new RegExp(search, 'i') },
            { email: new RegExp(search, 'i') },
            { mobile: new RegExp(search, 'i') }
          ]
        }
      : {};

    const agents = await Agent.find(query);
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
};

// ✅ Get agent by ID
exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching agent' });
  }
};

// ✅ Update agent by ID
exports.updateAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    agent.name = name || agent.name;
    agent.email = email || agent.email;
    agent.mobile = mobile || agent.mobile;

    if (password) {
      agent.password = await bcrypt.hash(password, 10);
    }

    await agent.save();
    res.json({ message: 'Agent updated successfully', agent });
  } catch (err) {
    res.status(500).json({ error: 'Error updating agent' });
  }
};

// Delete agent
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    res.json({ message: 'Agent deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting agent' });
  }
};
