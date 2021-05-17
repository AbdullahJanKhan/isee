var express = require('express');
var multer = require('multer');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
var router = express.Router();

router.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, 'images/' + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/upload', authenticate.verifyUser, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(req.file);
  });
});

router.post('/register', (req, res, next) => {
  User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        console.log(err)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false });
      } else {
        if (req.body.fname)
          user.fname = req.body.fname;
        if (req.body.lname)
          user.lname = req.body.lname;
        if (req.body.dob)
          user.dob = req.body.dob;
        if (req.body.gender)
          user.gender = req.body.gender
        if (req.body.city)
          user.city = req.body.city
        if (req.body.isDoctor)
          user.isDoctor = req.body.isDoctor
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            if (user.isDoctor)
              res.json({ success: true, id: user._id });
            else
              res.json({ success: true });
          });
        });
      }
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    token: token,
    status: 'You are successfully logged in!',
    user: req.user
  });
});

router.get('/get_user/:id', authenticate.verifyUser, (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err)
      res.json({
        err: err,
        success: false
      })
    else if (user) {
      res.json({
        user: user,
        success: true
      })
    } else {
      res.json({
        success: false
      })
    }
  })
})


module.exports = router;
