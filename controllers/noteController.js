const express = require('express');
const User = require('../models/userModel');
const Note = require('../models/noteModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllNotes = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.user.id) filter = { user: req.user.id };
  const note = await Note.find(filter);
  res.status(200).json({
    status: 'success',
    results: note.length,
    data: {
      note,
    },
  });
});

exports.createNote = catchAsync(async (req, res, next) => {
  const newNote = await Note.create({
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Note Created Successfully',
    data: newNote,
  });
});

exports.getNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id).populate('user');
  if (!note) {
    return next(new AppError('No note found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: note,
  });
});

exports.editNote = catchAsync(async (req, res, next) => {
  const { title, description, body } = req.body;
  const edit = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!edit) {
    return next(new AppError('No note found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Note Updated Successfully',
    data: edit,
  });
});

exports.deleteNote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) {
    return next(new AppError('No note found with that ID', 404));
  }
  res.status(204).json({
    data: null,
  });
});

exports.favouriteNote = catchAsync(async (req, res, next) => {
  const favourite = await Note.findByIdAndUpdate(
    req.query.noteId,
    {
      $push: { favourite: req.user._id },
    },
    { new: true }
  );

  if (!favourite) {
    return next(new AppError('No note found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Note Added To Favourites',
    data: favourite,
  });
});

exports.removeFavourite = catchAsync(async (req, res, next) => {
  const favourite = await Note.findByIdAndUpdate(
    req.query.noteId,
    {
      $pull: { favourite: req.user._id },
    },
    { new: true }
  );

  if (!favourite) {
    return next(new AppError('No note found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Note removed from favourites',
    data: favourite,
  });
});

exports.searchNote = catchAsync(async (req, res, next) => {
  const search = new RegExp('^' + req.query.title);
  const note = await Note.find({ title: { $regex: search } }).select(
    '_id title body '
  );

  if (note.length < 1) {
    return next(
      new AppError(
        'No note found with that title. Title is case sensitive',
        404
      )
    );
  }

  res.status(200).json({
    status: 'success',
    data: note,
  });
});
