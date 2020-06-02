const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')
const { ensureAuthenticated } = require('../config/auth')
// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })

  } catch {
    res.redirect('/')
  }
})

// New Author Route
router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('authors/new', { author: new Author() })
})

// Create Author Route
router.post('/', ensureAuthenticated, async (req, res) => {
  const author = new Author({
    name: req.body.name,
    userId: req.user._id
  })
  try {
    const newAuthor = await author.save()
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`)
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    })
  }
})


router.get('/:id', async (req, res) => {

  try {
    const author = await Author.findById(req.params.id)
    const books = await Book.find({ author: author.id }).limit(6).exec()
    res.render('authors/show', {
      author: author,
      booksByAuthor: books
    })
  } catch (err) {
    console.log(err);
    res.redirect('/')
  }
  // res.send('show author ' + req.params.id)
});


router.get('/:id/edit', ensureAuthenticated, async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    if (author.userId !== req.user._id.toString()) {
      res.render('authors/notallowed')
      //res.send('not allowed')
    } else {
      res.render('authors/edit', { author: author })
    }


  } catch {
    res.redirect('/authors')
  }
});


router.put('/:id', ensureAuthenticated, async (req, res) => {
  // const author = new Author({
  //   name: req.body.name
  // })
  let author
  try {
    author = await Author.findById(req.params.id)
    author.name = req.body.name
    await author.save()
    res.redirect(`/authors/${author.id}`)
    //res.redirect(`authors`)
  } catch {
    if (author == null) {
      res.redirect('/')
    } else {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating Author'
      })
    }
  }

  //res.send('update author ' + req.params.id)
});

router.delete('/:id', ensureAuthenticated, async (req, res) => {

  let author
  try {
    author = await Author.findById(req.params.id)
    if (author.userId !== req.user._id.toString()) {
      res.render('authors/notallowed')
      //res.send('not allowed')
    } else {
      await author.remove()
      res.redirect('/authors')

    }
    //res.redirect(`authors`)
  } catch {
    if (author == null) {
      res.redirect('/')
    } else {
      res.redirect(`/authors/${author.id}`)
    }
  }  //  res.send('delete author ' + req.params.id)
});


module.exports = router