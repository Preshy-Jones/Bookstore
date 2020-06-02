const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { ensureAuthenticated } = require('../config/auth')

//login page
router.get('/login', (req, res) => res.render('login'));
//register page
router.get('/register', (req, res) => res.render('register'));





//register handle
router.post('/register', (req, res) => {
    // console.log(req.body);
    // res.send('hello')
    const { name, email, username, password, password2 } = req.body;
    let errors = []
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'please fill in all fields' })
    }
    if (password !== password2) {
        errors.push({ msg: 'passwords do not match' })
    }
    // if (username.length < 6) {
    //     errors.push({ msg: 'username should be at least 6 characters' })
    // }

    if (password.length < 6) {
        errors.push({ msg: 'password should be at least 6 characters' })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email is already registered' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = User({
                        name,
                        email,
                        password
                    });
                    // console.log(newUser)
                    // res.send('hello')
                    //Hash Passoword
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //set password to hashed password
                        newUser.password = hash;
                        newUser.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('user: ' + newUser.email + " saved.");
                                req.login(newUser, function (err) {
                                    if (err) {
                                        console.log(err);
                                    }

                                    return res.redirect('/');
                                });
                            }
                        });
                    }))
                }
            })

        //        res.send('pass')
    }

});


// router.get('/test', ensureAuthenticated, (req, res) => {
//     const test = req.user._id.toString()
//     const user = User.findById(test)
//     res.send(user)
// });

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//handle logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'you are logged out')
    res.redirect('/users/login')
})

module.exports = router;