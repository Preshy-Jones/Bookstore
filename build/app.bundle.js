/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  \"secret\": \"Preshyjonesrocks\",\n  mongoURI: \"mongodb+srv://PreshyJones:confidence@myfirstcluster-2ekpt.mongodb.net/Bookstore?retryWrites=true&w=majority\"\n};\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/config/auth.js":
/*!****************************!*\
  !*** ./src/config/auth.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  ensureAuthenticated: function ensureAuthenticated(req, res, next) {\n    if (req.isAuthenticated()) {\n      return next();\n    }\n\n    req.flash('error_msg', 'please log in to view this resource');\n    res.redirect('/users/login');\n  }\n};\n\n//# sourceURL=webpack:///./src/config/auth.js?");

/***/ }),

/***/ "./src/config/passport.js":
/*!********************************!*\
  !*** ./src/config/passport.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var LocalStrategy = __webpack_require__(/*! passport-local */ \"passport-local\").Strategy;\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\"); //load user model\n\n\nvar User = __webpack_require__(/*! ../models/User */ \"./src/models/User.js\");\n\nmodule.exports = function (passport) {\n  passport.use(new LocalStrategy({\n    usernameField: 'email'\n  }, function (email, password, done) {\n    User.findOne({\n      email: email\n    }).then(function (user) {\n      if (!user) {\n        return done(null, false, {\n          message: 'that email is not registered'\n        });\n      } //match password\n\n\n      bcrypt.compare(password, user.password, function (err, isMatch) {\n        if (err) throw err;\n\n        if (isMatch) {\n          return done(null, user);\n        } else {\n          return done(null, false, {\n            message: 'password incorrect '\n          });\n        }\n      });\n    })[\"catch\"](function (err) {\n      return console.log(err);\n    });\n  }));\n  passport.serializeUser(function (user, done) {\n    done(null, user.id);\n  });\n  passport.deserializeUser(function (id, done) {\n    User.findById(id, function (err, user) {\n      done(err, user);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/config/passport.js?");

/***/ }),

/***/ "./src/models/User.js":
/*!****************************!*\
  !*** ./src/models/User.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar UserSchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  email: {\n    type: String,\n    required: true\n  },\n  password: {\n    type: String,\n    required: true\n  },\n  date: {\n    type: Date,\n    \"default\": Date.now\n  }\n});\nvar User = mongoose.model('User', UserSchema, 'users5');\nmodule.exports = User;\n\n//# sourceURL=webpack:///./src/models/User.js?");

/***/ }),

/***/ "./src/models/author.js":
/*!******************************!*\
  !*** ./src/models/author.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar Book = __webpack_require__(/*! ./book */ \"./src/models/book.js\");\n\nvar authorSchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  userId: {\n    type: String,\n    required: true\n  }\n});\nauthorSchema.pre('remove', function (next) {\n  Book.find({\n    author: this.id\n  }, function (err, books) {\n    if (err) {\n      next(err);\n    } else if (books.length > 0) {\n      next(new Error('This author has books still'));\n    } else {\n      next();\n    }\n  });\n});\nmodule.exports = mongoose.model('Author', authorSchema);\n\n//# sourceURL=webpack:///./src/models/author.js?");

/***/ }),

/***/ "./src/models/book.js":
/*!****************************!*\
  !*** ./src/models/book.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar bookSchema = new mongoose.Schema({\n  title: {\n    type: String,\n    required: true\n  },\n  description: {\n    type: String\n  },\n  publishDate: {\n    type: Date,\n    required: true\n  },\n  pageCount: {\n    type: Number,\n    required: true\n  },\n  createdAt: {\n    type: Date,\n    required: true,\n    \"default\": Date.now\n  },\n  coverImage: {\n    type: Buffer,\n    required: true\n  },\n  coverImageType: {\n    type: String,\n    required: true\n  },\n  author: {\n    type: mongoose.Schema.Types.ObjectId,\n    required: true,\n    ref: 'Author'\n  },\n  userId: {\n    type: String,\n    required: true\n  }\n});\nbookSchema.virtual('coverImagePath').get(function () {\n  if (this.coverImage != null && this.coverImageType != null) {\n    return \"data:\".concat(this.coverImageType, \";charset=utf-8;base64,\").concat(this.coverImage.toString('base64'));\n  }\n});\nmodule.exports = mongoose.model('Book', bookSchema);\n\n//# sourceURL=webpack:///./src/models/book.js?");

/***/ }),

/***/ "./src/routes/authors.js":
/*!*******************************!*\
  !*** ./src/routes/authors.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar Author = __webpack_require__(/*! ../models/author */ \"./src/models/author.js\");\n\nvar Book = __webpack_require__(/*! ../models/book */ \"./src/models/book.js\");\n\nvar _require = __webpack_require__(/*! ../config/auth */ \"./src/config/auth.js\"),\n    ensureAuthenticated = _require.ensureAuthenticated; // All Authors Route\n\n\nrouter.get('/', /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {\n    var searchOptions, authors;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            searchOptions = {};\n\n            if (req.query.name != null && req.query.name !== '') {\n              searchOptions.name = new RegExp(req.query.name, 'i');\n            }\n\n            _context.prev = 2;\n            _context.next = 5;\n            return Author.find(searchOptions);\n\n          case 5:\n            authors = _context.sent;\n            res.render('authors/index', {\n              authors: authors,\n              searchOptions: req.query\n            });\n            _context.next = 12;\n            break;\n\n          case 9:\n            _context.prev = 9;\n            _context.t0 = _context[\"catch\"](2);\n            res.redirect('/');\n\n          case 12:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[2, 9]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}()); // New Author Route\n\nrouter.get('/new', ensureAuthenticated, function (req, res) {\n  res.render('authors/new', {\n    author: new Author()\n  });\n}); // Create Author Route\n\nrouter.post('/', ensureAuthenticated, /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {\n    var author, newAuthor;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            author = new Author({\n              name: req.body.name,\n              userId: req.user._id\n            });\n            _context2.prev = 1;\n            _context2.next = 4;\n            return author.save();\n\n          case 4:\n            newAuthor = _context2.sent;\n            // res.redirect(`authors/${newAuthor.id}`)\n            res.redirect(\"authors\");\n            _context2.next = 11;\n            break;\n\n          case 8:\n            _context2.prev = 8;\n            _context2.t0 = _context2[\"catch\"](1);\n            res.render('authors/new', {\n              author: author,\n              errorMessage: 'Error creating Author'\n            });\n\n          case 11:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[1, 8]]);\n  }));\n\n  return function (_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}());\nrouter.get('/:id', /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {\n    var author, books;\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            _context3.prev = 0;\n            _context3.next = 3;\n            return Author.findById(req.params.id);\n\n          case 3:\n            author = _context3.sent;\n            _context3.next = 6;\n            return Book.find({\n              author: author.id\n            }).limit(6).exec();\n\n          case 6:\n            books = _context3.sent;\n            res.render('authors/show', {\n              author: author,\n              booksByAuthor: books\n            });\n            _context3.next = 14;\n            break;\n\n          case 10:\n            _context3.prev = 10;\n            _context3.t0 = _context3[\"catch\"](0);\n            console.log(_context3.t0);\n            res.redirect('/');\n\n          case 14:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3, null, [[0, 10]]);\n  }));\n\n  return function (_x5, _x6) {\n    return _ref3.apply(this, arguments);\n  };\n}());\nrouter.get('/:id/edit', ensureAuthenticated, /*#__PURE__*/function () {\n  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {\n    var author;\n    return regeneratorRuntime.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            _context4.prev = 0;\n            _context4.next = 3;\n            return Author.findById(req.params.id);\n\n          case 3:\n            author = _context4.sent;\n\n            if (author.userId !== req.user._id.toString()) {\n              res.render('authors/notallowed'); //res.send('not allowed')\n            } else {\n              res.render('authors/edit', {\n                author: author\n              });\n            }\n\n            _context4.next = 10;\n            break;\n\n          case 7:\n            _context4.prev = 7;\n            _context4.t0 = _context4[\"catch\"](0);\n            res.redirect('/authors');\n\n          case 10:\n          case \"end\":\n            return _context4.stop();\n        }\n      }\n    }, _callee4, null, [[0, 7]]);\n  }));\n\n  return function (_x7, _x8) {\n    return _ref4.apply(this, arguments);\n  };\n}());\nrouter.put('/:id', ensureAuthenticated, /*#__PURE__*/function () {\n  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {\n    var author;\n    return regeneratorRuntime.wrap(function _callee5$(_context5) {\n      while (1) {\n        switch (_context5.prev = _context5.next) {\n          case 0:\n            _context5.prev = 0;\n            _context5.next = 3;\n            return Author.findById(req.params.id);\n\n          case 3:\n            author = _context5.sent;\n            author.name = req.body.name;\n            _context5.next = 7;\n            return author.save();\n\n          case 7:\n            res.redirect(\"/authors/\".concat(author.id)); //res.redirect(`authors`)\n\n            _context5.next = 13;\n            break;\n\n          case 10:\n            _context5.prev = 10;\n            _context5.t0 = _context5[\"catch\"](0);\n\n            if (author == null) {\n              res.redirect('/');\n            } else {\n              res.render('authors/edit', {\n                author: author,\n                errorMessage: 'Error updating Author'\n              });\n            }\n\n          case 13:\n          case \"end\":\n            return _context5.stop();\n        }\n      }\n    }, _callee5, null, [[0, 10]]);\n  }));\n\n  return function (_x9, _x10) {\n    return _ref5.apply(this, arguments);\n  };\n}());\nrouter[\"delete\"]('/:id', ensureAuthenticated, /*#__PURE__*/function () {\n  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {\n    var author;\n    return regeneratorRuntime.wrap(function _callee6$(_context6) {\n      while (1) {\n        switch (_context6.prev = _context6.next) {\n          case 0:\n            _context6.prev = 0;\n            _context6.next = 3;\n            return Author.findById(req.params.id);\n\n          case 3:\n            author = _context6.sent;\n\n            if (!(author.userId !== req.user._id.toString())) {\n              _context6.next = 8;\n              break;\n            }\n\n            res.render('authors/notallowed'); //res.send('not allowed')\n\n            _context6.next = 11;\n            break;\n\n          case 8:\n            _context6.next = 10;\n            return author.remove();\n\n          case 10:\n            res.redirect('/authors');\n\n          case 11:\n            _context6.next = 16;\n            break;\n\n          case 13:\n            _context6.prev = 13;\n            _context6.t0 = _context6[\"catch\"](0);\n\n            if (author == null) {\n              res.redirect('/');\n            } else {\n              res.redirect(\"/authors/\".concat(author.id));\n            }\n\n          case 16:\n          case \"end\":\n            return _context6.stop();\n        }\n      }\n    }, _callee6, null, [[0, 13]]);\n  }));\n\n  return function (_x11, _x12) {\n    return _ref6.apply(this, arguments);\n  };\n}());\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/authors.js?");

/***/ }),

/***/ "./src/routes/books.js":
/*!*****************************!*\
  !*** ./src/routes/books.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar Book = __webpack_require__(/*! ../models/book */ \"./src/models/book.js\");\n\nvar Author = __webpack_require__(/*! ../models/author */ \"./src/models/author.js\");\n\nvar imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif'];\n\nvar _require = __webpack_require__(/*! ../config/auth */ \"./src/config/auth.js\"),\n    ensureAuthenticated = _require.ensureAuthenticated; // All Books Route\n\n\nrouter.get('/', /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {\n    var query, books;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            query = Book.find();\n\n            if (req.query.title != null && req.query.title != '') {\n              query = query.regex('title', new RegExp(req.query.title, 'i'));\n            }\n\n            if (req.query.publishedBefore != null && req.query.publishedBefore != '') {\n              query = query.lte('publishDate', req.query.publishedBefore);\n            }\n\n            if (req.query.publishedAfter != null && req.query.publishedAfter != '') {\n              query = query.gte('publishDate', req.query.publishedAfter);\n            }\n\n            _context.prev = 4;\n            _context.next = 7;\n            return query.exec();\n\n          case 7:\n            books = _context.sent;\n            res.render('books/index', {\n              books: books,\n              searchOptions: req.query\n            });\n            _context.next = 14;\n            break;\n\n          case 11:\n            _context.prev = 11;\n            _context.t0 = _context[\"catch\"](4);\n            res.redirect('/');\n\n          case 14:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[4, 11]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}()); // New Book Route\n\nrouter.get('/new', ensureAuthenticated, /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            renderNewPage(res, new Book());\n\n          case 1:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n\n  return function (_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}()); // Create Book Route\n\nrouter.post('/', ensureAuthenticated, /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {\n    var book, newBook;\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            book = new Book({\n              title: req.body.title,\n              author: req.body.author,\n              publishDate: new Date(req.body.publishDate),\n              pageCount: req.body.pageCount,\n              description: req.body.description,\n              userId: req.user._id\n            });\n            saveCover(book, req.body.cover);\n            _context3.prev = 2;\n            _context3.next = 5;\n            return book.save();\n\n          case 5:\n            newBook = _context3.sent;\n            res.redirect(\"books/\".concat(newBook.id)); //res.redirect(`books`)\n\n            _context3.next = 12;\n            break;\n\n          case 9:\n            _context3.prev = 9;\n            _context3.t0 = _context3[\"catch\"](2);\n            renderNewPage(res, book, true);\n\n          case 12:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3, null, [[2, 9]]);\n  }));\n\n  return function (_x5, _x6) {\n    return _ref3.apply(this, arguments);\n  };\n}()); // show single book\n\nrouter.get('/:id', /*#__PURE__*/function () {\n  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {\n    var book;\n    return regeneratorRuntime.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            _context4.prev = 0;\n            _context4.next = 3;\n            return Book.findById(req.params.id).populate('author').exec();\n\n          case 3:\n            book = _context4.sent;\n            res.render('books/show', {\n              book: book\n            });\n            _context4.next = 10;\n            break;\n\n          case 7:\n            _context4.prev = 7;\n            _context4.t0 = _context4[\"catch\"](0);\n            res.redirect('/');\n\n          case 10:\n          case \"end\":\n            return _context4.stop();\n        }\n      }\n    }, _callee4, null, [[0, 7]]);\n  }));\n\n  return function (_x7, _x8) {\n    return _ref4.apply(this, arguments);\n  };\n}());\nrouter.get('/:id/edit', ensureAuthenticated, /*#__PURE__*/function () {\n  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {\n    var book;\n    return regeneratorRuntime.wrap(function _callee5$(_context5) {\n      while (1) {\n        switch (_context5.prev = _context5.next) {\n          case 0:\n            _context5.prev = 0;\n            _context5.next = 3;\n            return Book.findById(req.params.id);\n\n          case 3:\n            book = _context5.sent;\n\n            if (book.userId !== req.user._id.toString()) {\n              res.render('books/notallowed'); //res.send('not allowed')\n            } else {\n              renderEditPage(res, book);\n            }\n\n            _context5.next = 10;\n            break;\n\n          case 7:\n            _context5.prev = 7;\n            _context5.t0 = _context5[\"catch\"](0);\n            res.redirect('/');\n\n          case 10:\n          case \"end\":\n            return _context5.stop();\n        }\n      }\n    }, _callee5, null, [[0, 7]]);\n  }));\n\n  return function (_x9, _x10) {\n    return _ref5.apply(this, arguments);\n  };\n}()); // update Book Route\n\nrouter.put('/:id', ensureAuthenticated, /*#__PURE__*/function () {\n  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {\n    var book;\n    return regeneratorRuntime.wrap(function _callee6$(_context6) {\n      while (1) {\n        switch (_context6.prev = _context6.next) {\n          case 0:\n            _context6.prev = 0;\n            _context6.next = 3;\n            return Book.findById(req.params.id);\n\n          case 3:\n            book = _context6.sent;\n            book.title = req.body.title;\n            book.author = req.body.author;\n            book.publishDate = new Date(req.body.publishDate);\n            book.pageCount = req.body.pageCount;\n            book.description = req.body.description;\n\n            if (req.body.cover != null && req.body.cover !== '') {\n              saveCover(book, req.body.cover);\n            }\n\n            _context6.next = 12;\n            return book.save();\n\n          case 12:\n            res.redirect(\"/books/\".concat(book.id));\n            _context6.next = 18;\n            break;\n\n          case 15:\n            _context6.prev = 15;\n            _context6.t0 = _context6[\"catch\"](0);\n\n            if (book != null) {\n              renderEditPage(res, book, true);\n            } else {\n              redirect('/');\n            }\n\n          case 18:\n          case \"end\":\n            return _context6.stop();\n        }\n      }\n    }, _callee6, null, [[0, 15]]);\n  }));\n\n  return function (_x11, _x12) {\n    return _ref6.apply(this, arguments);\n  };\n}());\nrouter[\"delete\"]('/:id', ensureAuthenticated, /*#__PURE__*/function () {\n  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {\n    var book;\n    return regeneratorRuntime.wrap(function _callee7$(_context7) {\n      while (1) {\n        switch (_context7.prev = _context7.next) {\n          case 0:\n            _context7.prev = 0;\n            _context7.next = 3;\n            return Book.findById(req.params.id);\n\n          case 3:\n            book = _context7.sent;\n\n            if (!(book.userId !== req.user._id.toString())) {\n              _context7.next = 8;\n              break;\n            }\n\n            res.render('books/notallowed'); //res.send('not allowed')\n\n            _context7.next = 11;\n            break;\n\n          case 8:\n            _context7.next = 10;\n            return book.remove();\n\n          case 10:\n            res.redirect('/books');\n\n          case 11:\n            _context7.next = 16;\n            break;\n\n          case 13:\n            _context7.prev = 13;\n            _context7.t0 = _context7[\"catch\"](0);\n\n            if (book != null) {\n              res.render('books/show', {\n                book: book,\n                errorMessage: 'could not remove book'\n              });\n            } else {\n              res.redirect('/');\n            }\n\n          case 16:\n          case \"end\":\n            return _context7.stop();\n        }\n      }\n    }, _callee7, null, [[0, 13]]);\n  }));\n\n  return function (_x13, _x14) {\n    return _ref7.apply(this, arguments);\n  };\n}());\n\nfunction renderNewPage(_x15, _x16) {\n  return _renderNewPage.apply(this, arguments);\n}\n\nfunction _renderNewPage() {\n  _renderNewPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(res, book) {\n    var hasError,\n        _args8 = arguments;\n    return regeneratorRuntime.wrap(function _callee8$(_context8) {\n      while (1) {\n        switch (_context8.prev = _context8.next) {\n          case 0:\n            hasError = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : false;\n            renderFormPage(res, book, 'new', hasError);\n\n          case 2:\n          case \"end\":\n            return _context8.stop();\n        }\n      }\n    }, _callee8);\n  }));\n  return _renderNewPage.apply(this, arguments);\n}\n\nfunction renderEditPage(_x17, _x18) {\n  return _renderEditPage.apply(this, arguments);\n}\n\nfunction _renderEditPage() {\n  _renderEditPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(res, book) {\n    var hasError,\n        _args9 = arguments;\n    return regeneratorRuntime.wrap(function _callee9$(_context9) {\n      while (1) {\n        switch (_context9.prev = _context9.next) {\n          case 0:\n            hasError = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : false;\n            renderFormPage(res, book, 'edit', hasError);\n\n          case 2:\n          case \"end\":\n            return _context9.stop();\n        }\n      }\n    }, _callee9);\n  }));\n  return _renderEditPage.apply(this, arguments);\n}\n\nfunction renderFormPage(_x19, _x20, _x21) {\n  return _renderFormPage.apply(this, arguments);\n}\n\nfunction _renderFormPage() {\n  _renderFormPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(res, book, form) {\n    var hasError,\n        authors,\n        params,\n        _args10 = arguments;\n    return regeneratorRuntime.wrap(function _callee10$(_context10) {\n      while (1) {\n        switch (_context10.prev = _context10.next) {\n          case 0:\n            hasError = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : false;\n            _context10.prev = 1;\n            _context10.next = 4;\n            return Author.find({});\n\n          case 4:\n            authors = _context10.sent;\n            params = {\n              authors: authors,\n              book: book\n            };\n\n            if (hasError) {\n              if (form === 'edit') {\n                params.errorMessage = 'error editing book ';\n              } else {\n                params.errorMessage = 'error creating book';\n              }\n            }\n\n            if (hasError) params.errorMessage = 'Fill in all fields';\n            res.render(\"books/\".concat(form), params);\n            _context10.next = 14;\n            break;\n\n          case 11:\n            _context10.prev = 11;\n            _context10.t0 = _context10[\"catch\"](1);\n            res.redirect('/books');\n\n          case 14:\n          case \"end\":\n            return _context10.stop();\n        }\n      }\n    }, _callee10, null, [[1, 11]]);\n  }));\n  return _renderFormPage.apply(this, arguments);\n}\n\nfunction saveCover(book, coverEncoded) {\n  if (coverEncoded == null) return;\n  var cover = JSON.parse(coverEncoded);\n\n  if (cover != null && imageMimeTypes.includes(cover.type)) {\n    book.coverImage = new Buffer.from(cover.data, 'base64');\n    book.coverImageType = cover.type;\n  }\n}\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/books.js?");

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar Book = __webpack_require__(/*! ../models/book */ \"./src/models/book.js\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _require = __webpack_require__(/*! ../config/auth */ \"./src/config/auth.js\"),\n    ensureAuthenticated = _require.ensureAuthenticated; // //welcome\n// router.get('/', (req, res) => res.render('welcome'));\n// //dashboard\n\n\nrouter.get('/dashboard', ensureAuthenticated, function (req, res) {\n  return res.render('dashboard', {\n    name: req.user.name\n  });\n});\nmodule.exports = router;\nrouter.get('/', /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {\n    var books;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return Book.find().sort({\n              createdAt: 'desc'\n            }).limit(10).exec();\n\n          case 3:\n            books = _context.sent;\n            _context.next = 9;\n            break;\n\n          case 6:\n            _context.prev = 6;\n            _context.t0 = _context[\"catch\"](0);\n            books = [];\n\n          case 9:\n            res.render('index', {\n              books: books\n            });\n\n          case 10:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 6]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\nrouter.get('/logs', function (req, res) {\n  var readStream = fs.createReadStream('logs', 'utf8'); // readStream.on('data', function (chunk) {\n  //     res.send(chunk)\n  // })\n\n  var data = '';\n  readStream.on('data', function (chunk) {\n    data += chunk;\n    console.log(chunk);\n  }).on('end', function () {\n    res.header(\"Content-Type\", \"text/plain\");\n    res.end(data); //      res.status(200).json(data)\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/index.js?");

/***/ }),

/***/ "./src/routes/users.js":
/*!*****************************!*\
  !*** ./src/routes/users.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n\nvar User = __webpack_require__(/*! ../models/User */ \"./src/models/User.js\");\n\nvar _require = __webpack_require__(/*! ../config/auth */ \"./src/config/auth.js\"),\n    ensureAuthenticated = _require.ensureAuthenticated; //login page\n\n\nrouter.get('/login', function (req, res) {\n  return res.render('login');\n}); //register page\n\nrouter.get('/register', function (req, res) {\n  return res.render('register');\n}); //register handle\n\nrouter.post('/register', function (req, res) {\n  // console.log(req.body);\n  // res.send('hello')\n  var _req$body = req.body,\n      name = _req$body.name,\n      email = _req$body.email,\n      username = _req$body.username,\n      password = _req$body.password,\n      password2 = _req$body.password2;\n  var errors = [];\n\n  if (!name || !email || !password || !password2) {\n    errors.push({\n      msg: 'please fill in all fields'\n    });\n  }\n\n  if (password !== password2) {\n    errors.push({\n      msg: 'passwords do not match'\n    });\n  } // if (username.length < 6) {\n  //     errors.push({ msg: 'username should be at least 6 characters' })\n  // }\n\n\n  if (password.length < 6) {\n    errors.push({\n      msg: 'password should be at least 6 characters'\n    });\n  }\n\n  if (errors.length > 0) {\n    res.render('register', {\n      errors: errors,\n      name: name,\n      email: email,\n      password: password,\n      password2: password2\n    });\n  } else {\n    //\n    User.findOne({\n      email: email\n    }).then(function (user) {\n      if (user) {\n        errors.push({\n          msg: 'Email is already registered'\n        });\n        res.render('register', {\n          errors: errors,\n          name: name,\n          email: email,\n          password: password,\n          password2: password2\n        });\n      } else {\n        var newUser = User({\n          name: name,\n          email: email,\n          password: password\n        }); // console.log(newUser)\n        // res.send('hello')\n        //Hash Passoword\n\n        bcrypt.genSalt(10, function (err, salt) {\n          return bcrypt.hash(newUser.password, salt, function (err, hash) {\n            if (err) throw err; //set password to hashed password\n\n            newUser.password = hash;\n            newUser.save(function (err) {\n              if (err) {\n                console.log(err);\n              } else {\n                console.log('user: ' + newUser.email + \" saved.\");\n                req.login(newUser, function (err) {\n                  if (err) {\n                    console.log(err);\n                  }\n\n                  return res.redirect('/');\n                });\n              }\n            });\n          });\n        });\n      }\n    }); //        res.send('pass')\n  }\n}); // router.get('/test', ensureAuthenticated, (req, res) => {\n//     const test = req.user._id.toString()\n//     const user = User.findById(test)\n//     res.send(user)\n// });\n\nrouter.post('/login', function (req, res, next) {\n  passport.authenticate('local', {\n    successRedirect: '/',\n    failureRedirect: '/users/login',\n    failureFlash: true\n  })(req, res, next);\n}); //handle logout\n\nrouter.get('/logout', function (req, res) {\n  req.logout();\n  req.flash('success_msg', 'you are logged out');\n  res.redirect('/users/login');\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/users.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {// if (process.env.NODE_ENV !== 'production') {\n//   require('dotenv').load()\n// }\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar app = express();\n\nvar expressLayouts = __webpack_require__(/*! express-ejs-layouts */ \"express-ejs-layouts\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar indexRouter = __webpack_require__(/*! ./routes/index */ \"./src/routes/index.js\");\n\nvar authorRouter = __webpack_require__(/*! ./routes/authors */ \"./src/routes/authors.js\");\n\nvar morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar bookRouter = __webpack_require__(/*! ./routes/books */ \"./src/routes/books.js\");\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar db = __webpack_require__(/*! ./config */ \"./src/config.js\").mongoURI;\n\nvar methodOverride = __webpack_require__(/*! method-override */ \"method-override\");\n\nvar flash = __webpack_require__(/*! connect-flash */ \"connect-flash\");\n\nvar session = __webpack_require__(/*! cookie-session */ \"cookie-session\");\n\nvar passport = __webpack_require__(/*! passport */ \"passport\"); //passport config\n\n\n__webpack_require__(/*! ./config/passport */ \"./src/config/passport.js\")(passport); // //body parser\n// app.use(express.urlencoded({ extended: false }));\n\n\nvar port = process.env.PORT || 3000; // const mongoose = require('mongoose')\n// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })\n// const db = mongoose.connection\n// db.on('error', error => console.error(error))\n// db.once('open', () => console.log('Connected to Mongoose'))\n// mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {\n//   console.log('mongoDB connected')\n// })\n\ndotenv.config();\nmongoose.connect(process.env.DB_CONNECT, {\n  useNewUrlParser: true,\n  useCreateIndex: true,\n  useFindAndModify: false,\n  useUnifiedTopology: true\n}, function () {\n  return console.log('connected to mongodb');\n});\napp.set('view engine', 'ejs');\napp.set('views', './src/views');\napp.set('layout', 'layouts/layout');\napp.use(expressLayouts);\napp.use(express[\"static\"]('src/public'));\napp.use(bodyParser.urlencoded({\n  limit: '10mb',\n  extended: false\n}));\napp.use(session({\n  secret: 'secret',\n  resave: true,\n  saveUninitialized: true,\n  cookie: {\n    maxAge: 1000 * 60 * 60 * 24 * 365\n  }\n})); //passport middleware\n\napp.use(passport.initialize());\napp.use(passport.session());\napp.use(flash()); //global variables\n\napp.use(function (req, res, next) {\n  res.locals.success_msg = req.flash('success_msg');\n  res.locals.error_msg = req.flash('error_msg');\n  res.locals.error = req.flash('error');\n  next();\n});\napp.use(methodOverride('_method'));\napp.use(morgan('dev'));\napp.use(morgan('tiny', {\n  stream: fs.createWriteStream(path.join(__dirname, 'logs'))\n}));\napp.use('/', indexRouter);\napp.use('/authors', authorRouter);\napp.use('/books', bookRouter);\napp.use('/users', __webpack_require__(/*! ./routes/users */ \"./src/routes/users.js\")); //app.use('/users', require('./routes/users'))\n\napp.listen(port, function () {\n  console.log(\"Server running on port \".concat(port));\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi babel-polyfill ./src/server.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! ./src/server.js */\"./src/server.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./src/server.js?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "connect-flash":
/*!********************************!*\
  !*** external "connect-flash" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-flash\");\n\n//# sourceURL=webpack:///external_%22connect-flash%22?");

/***/ }),

/***/ "cookie-session":
/*!*********************************!*\
  !*** external "cookie-session" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-session\");\n\n//# sourceURL=webpack:///external_%22cookie-session%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-ejs-layouts":
/*!**************************************!*\
  !*** external "express-ejs-layouts" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-ejs-layouts\");\n\n//# sourceURL=webpack:///external_%22express-ejs-layouts%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "method-override":
/*!**********************************!*\
  !*** external "method-override" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"method-override\");\n\n//# sourceURL=webpack:///external_%22method-override%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });