// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').load()
// }

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const morgan = require('morgan')
const bookRouter = require('./routes/books')
const mongoose = require('mongoose')
const db = require('./config').mongoURI
const methodOverride = require('method-override')



const flash = require('connect-flash')
const session = require('cookie-session')
const passport = require('passport')

//passport config
require('./config/passport')(passport)

// //body parser
// app.use(express.urlencoded({ extended: false }));



const port = process.env.PORT || 3000

// const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))

// mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
//   console.log('mongoDB connected')
// })


dotenv.config();
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true },
  () => console.log('connected to mongodb')
);




app.set('view engine', 'ejs')
app.set('views', './src/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('src/public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))




app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365
  }

}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

app.use(methodOverride('_method'));


app.use(morgan('dev'))

app.use(morgan('tiny', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs'))
}))
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
app.use('/users', require('./routes/users'))
//app.use('/users', require('./routes/users'))


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})