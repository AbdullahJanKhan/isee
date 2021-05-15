var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var BP = require('../models/bp');
var BG = require('../models/bg');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/add_bg_record', authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    BG.findOne({ patient: req.body.patient }, (err, record) => {
        if (err) {
            res.json({
                err: err,
                success: false
            })
        } else if (record) {
            record.dateAdded.push(Date.now())
            record.timeofday.push(req.body.timeofday)
            record.value.push(req.body.value)
            record.unit.push(req.body.unit)
            record.save((err, data) => {
                if (err) {
                    res.json({
                        err: err,
                        success: false
                    })
                }
                else {
                    res.json({
                        success: true,
                        record: data
                    })

                }
            })
        } else {
            BG.create(req.body, (err, data) => {
                if (err)
                    res.json({
                        err: err,
                        success: false
                    })
                else
                    res.json({
                        record: data,
                        success: true
                    })
            })
        }
    })
})

router.post('/add_bp_record', authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    BP.findOne({ patient: req.body.patient }, (err, record) => {
        if (err) {
            res.json({
                err: err,
                success: false
            })
        } else if (record) {
            record.dateAdded.push(Date.now())
            record.systolic.push(Number(req.body.systolic))
            record.dystolic.push(Number(req.body.dystolic))
            record.save((err, data) => {
                if (err) {
                    res.json({
                        err: err,
                        success: false
                    })
                }
                else {
                    res.json({
                        success: true,
                        record: data
                    })

                }
            })
        }
        else {
            BP.create(req.body, (err, data) => {
                if (err)
                    res.json({
                        err: err,
                        success: false
                    })
                else
                    res.json({
                        record: data,
                        success: true
                    })
            })

        }
    })
})

router.get('/get_bp_record', authenticate.verifyUser, (req, res, next) => {
    BP.findOne({ patient: req.body.patient }, (err, record) => {
        if (err)
            res.json({
                err: err,
                success: false
            })
        else
            res.json({
                record: record,
                success: true
            })
    })
})

router.get('/get_bg_record', authenticate.verifyUser, (req, res, next) => {
    BG.findOne({ patient: req.body.patient }, (err, record) => {
        if (err)
            res.json({
                err: err,
                success: false
            })
        else
            res.json({
                record: record,
                success: true
            })
    })
})


module.exports = router;
