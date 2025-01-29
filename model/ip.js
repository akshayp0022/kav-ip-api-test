const mongoose = require('mongoose');

const ipSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true, 
  },
},
{ collection: 'ip' }
);

const IpModel = mongoose.model('Ip', ipSchema);

module.exports = IpModel;