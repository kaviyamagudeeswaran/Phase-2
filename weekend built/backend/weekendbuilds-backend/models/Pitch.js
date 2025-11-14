const mongoose = require('mongoose');

const pitchSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
  link:        { type: String },
  image:       { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Pitch', pitchSchema);
