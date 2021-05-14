var express = require('express');
var router = express.Router();
var Doctor = require('../models/doctor');
var User = require('../models/user');

router.use(express.json());

router.post('/is_doctor', (req, res) => {
    const _id = req.body.id
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    User.findOne({ _id: _id }, function (err, user) {
        if (err) {
            res.json({
                success: false,
                msg: 'Doctor Not Registered',
                to: '/register'
            })
        }
        if (user) {
            const doctor = new Doctor({
                _id: _id,
                pmdcid: req.body.pmdcid,
            });
            doctor.save((err, doc) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Doctor not Registered',
                        to: '/register'
                    })
                }
                res.json({
                    success: true,
                    msg: 'Doctor Registered',
                    to: '/login'
                })
            })
        } else {
            res.json({
                success: false,
                msg: 'Doctor not found',
                to: '/register'
            })
        }
    });
})

module.exports = router;
