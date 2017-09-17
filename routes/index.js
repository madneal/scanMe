const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
/* GET home page. */

const formatDocs = docs => {
  docs.forEach(doc => {
    console.log(doc);
    doc = doc.toObject();
  })
  return docs;
}
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  const model = mongoose.model('realestate');
  const queryCretia = {line: '3号线'};
  model.find(queryCretia, (err, docs) => {
    console.log(Object.prototype.toString.call(docs));
    console.log(Object.prototype.toString.call(docs[0]));
    // fs.writeFileSync('test.json', JSON.stringify(docs));
    // docs = JSON.stringify(docs);
    // docs = JSON.parse(docs);
    console.log(docs[0].title);
    console.dir(Object.getPrototypeOf(docs[0]));
    console.dir(Object.getPrototypeOf(Object.getPrototypeOf(docs[0])));    
    console.dir(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(docs[0]))));
    console.dir(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(docs[0])))));
    
    docs1 = docs.map(function (doc) {
        return doc.toObject({getters: false, virtual: false});
    });
    console.log(Object.prototype.toString.call(docs));
    console.log(Object.prototype.toString.call(docs[0]));
    console.log(docs1[0].title);
    console.dir(Object.getPrototypeOf(docs1[0]));
    console.dir(Object.getPrototypeOf(Object.getPrototypeOf(docs1[0])));
    // docs = JSON.parse(docs.toString());
    res.render('index', {
      title: 'express',
      docs: docs1
    })
  })
});

module.exports = router;
