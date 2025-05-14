const Agent = require('../models/Agent.model');
const DistributedTask = require('../models/DistributedTask.model');

exports.getDistributedTasks = async (req, res) => {
  const agents = await Agent.find();
  const result = [];

  for (const agent of agents) {
    const tasks = await DistributedTask.find({ agentId: agent._id });
    result.push({ agentId: agent._id, agentName: agent.name, tasks });
  }

  res.json(result);
};
