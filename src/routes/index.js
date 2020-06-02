const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const fs = require('fs')

const { ensureAuthenticated } = require('../config/auth')

// //welcome
// router.get('/', (req, res) => res.render('welcome'));
// //dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.name
  }));

module.exports = router;

router.get('/', async (req, res) => {
  let books
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    books = []
  }
  res.render('index', { books: books })
})


router.get('/logs', (req, res) => {
  var readStream = fs.createReadStream('logs', 'utf8')

  // readStream.on('data', function (chunk) {
  //     res.send(chunk)
  // })
  let data = ''

  readStream.on('data', (chunk) => {
    data += (chunk)
    console.log(chunk)
  }).on('end', () => {
    res.header("Content-Type", "text/plain");
    res.end(data);
    //      res.status(200).json(data)
  })
})


module.exports = router