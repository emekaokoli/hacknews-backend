const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    by: {
      type: String,
    },
    time: {
      type: Number,
    },
    dead: {
      type: Boolean,
      default: false,
    },
    kids: {
      type: Array,
    },
    descendants: {
      type: Number,
    },
    score: {
      type: Number,
    },
    title: { 
      type: String,
    },
    url: {
      type: String,
      default: 'http://www.spotlight.io/prism/',
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

exports.NewsModel = mongoose.model('News', newsSchema);
