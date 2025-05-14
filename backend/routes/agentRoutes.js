const express = require('express');
const router = express.Router();
const {
  addAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent
} = require('../controller/agentController');

// POST /api/agents/add - Add new agent
router.post('/add', addAgent);

// GET /api/agents - Get all agents
router.get('/', getAgents);

// ✅ GET /api/agents/:id - Get single agent
router.get('/:id', getAgentById);

// ✅ PUT /api/agents/:id - Update agent
router.put('/:id', updateAgent);

// DELETE /api/agents/:id - Delete agent
router.delete('/:id', deleteAgent);

module.exports = router;
