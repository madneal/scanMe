const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');

const formatDocs = docs => {
  const docs1 = docs.map(doc => {
    return doc.toObject();
  })
  return docs1;
}

router.get('/data', (req, res, next) => {
  const model = mongoose.model('realestate');
  let queryCretia = {};
  for (const key in req.query) {
    console.log(key);
    queryCretia[key] = req.query[key];
  }
  model.find(queryCretia, (err, docs) => {
    res.send(formatDocs(docs));
  })
})

module.exports = router;
