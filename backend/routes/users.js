var express = require('express');
var multer = require('multer');
var User = require('../models/user');
var Dataset = require('../models/dataset')
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
        if (req.body.firstname)
          user.fname = req.body.firstname;
        if (req.body.lastname)
          user.lname = req.body.lastname;
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


router.post('/add_new_data', authenticate.verifyUser, (req, res) => {
  console.log(req.body)
  const dataset = new Dataset(req.body)
  dataset.save((err, data) => {
    if (err) res.json({ success: false, message: err.name })
    else res.json({ success: true, data: data })
  })
})

const storage_pp = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, 'images/' + req.user._id + "." + file.mimetype.split('/')[1])
  }
})

const upload_pp = multer({ storage: storage_pp }).single('file')

router.post("/uploadprofilepicture", authenticate.verifyUser, (req, res) => {
  upload_pp(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(req.file);
  });
})

module.exports = router;
