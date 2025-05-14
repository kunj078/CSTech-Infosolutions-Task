const csv = require('csvtojson');
const xlsx = require('xlsx');
const Agent = require('../models/Agent.model');
const DistributedTask = require('../models/DistributedTask.model.js');
const fs = require('fs');

exports.uploadCSV = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const ext = file.originalname.split('.').pop();
  if (!['csv', 'xlsx', 'xls'].includes(ext)) {
    fs.unlinkSync(file.path);
    return res.status(400).json({ error: 'Invalid file type' });
  }

  try {
    let data = [];
    if (ext === 'csv') {
      data = await csv().fromFile(file.path);
    } else {
      const workbook = xlsx.readFile(file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(sheet);
    }

    fs.unlinkSync(file.path); // cleanup

    const agents = await Agent.find();
    if (agents.length < 5) return res.status(400).json({ error: 'At least 5 agents required' });

    const distributed = [[], [], [], [], []];
    data.forEach((item, i) => {
      const index = i % 5;
      distributed[index].push(item);
    });

    for (let i = 0; i < 5; i++) {
      const agent = agents[i];
      for (const task of distributed[i]) {
        await DistributedTask.create({
          agentId: agent._id,
          firstName: task.FirstName,
          phone: task.Phone,
          notes: task.Notes
        });
      }
    }

    res.status(200).json({ message: 'Tasks distributed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process file' });
  }
};
