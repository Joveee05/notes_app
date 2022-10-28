const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A note must have a title'],
  },
  description: {
    type: String,
  },
  body: {
    type: String,
    required: [true, 'A note must have a body'],
  },
  favourite: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A note must belong to a user.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

notesSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

notesSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();

  next();
});

const Notes = mongoose.model('Notes', notesSchema);
module.exports = Notes;
