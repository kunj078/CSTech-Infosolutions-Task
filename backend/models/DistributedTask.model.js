const mongoose = require('mongoose');

const distributedTaskSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  firstName: {type:String, require},
  phone: {type:String, require},
  notes: {type:String, require}
});

const DistributedTask= mongoose.models.DistributedTask || mongoose.model('DistributedTask', distributedTaskSchema);
module.exports = DistributedTask;