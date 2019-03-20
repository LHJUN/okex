'use strict';

const mongoose = require('mongoose');

const BaoBaoNameSchema = new mongoose.Schema({
    label: {
      type: String
    },
    gender: {
      type: String
    },
    popularityPercent: {
      type: String
    },
    dataId: {
      type: String
    },
    liked: {
      type: String
    },
    means: {
      type: String
    },
    origin: {
      type: String
    },
    information: {
      common: {
        type: String
      },
      experts: {
        type: String
      }
    }
  }
);

mongoose.model('BaoBaoName', BaoBaoNameSchema);
