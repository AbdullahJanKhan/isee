var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Request = require('../models/request')
var Doctor = require('../models/doctor')
router.post('/add_request', authenticate.verifyUser, (req, res) => {
    Request.create(req.body, (err, data) => {
        if (err)
            res.json({
                success: false,
                err: err
            })
        else
            res.json({
                success: true,
                data: data
            })
    })
})

router.get('/get_requests', authenticate.verifyUser, (req, res) => {
    Request.find({ p_id: req.user._id }, (err, data) => {
        if (err)
            res.json({
                success: false,
                err: err
            })
        else if (data.length > 0) {
            var d_id = []
            for (var i = 0; i < data.length; i++) {
                d_id.push(data[i].d_id)
            }
            res.json({
                success: true,
                data: d_id
            })
        }
        else {
            res.json({
                success: false,
                err: 'No Record Found'
            })
        }
    })
})

router.get('/recieved_req', authenticate.verifyUser, (req, res) => {
    Doctor.findOne({ userid: req.user._id }, (err, user) => {
        if (err)
            res.json({
                success: false,
                message: err.name
            })
        else if (user) {
            Request.find({ d_id: user._id }, (err, requests) => {
                if (err)
                    res.json({
                        success: false,
                        message: err.name
                    })
                else if (requests.length > 0) {
                    res.json({
                        success: true,
                        requests: requests,
                        message: 'Request Fetched'
                    })
                }
                else {
                    res.json({
                        success: false,
                        message: 'No Record Found'
                    })
                }
            })
        }
        else {
            res.json({
                success: false,
                message: 'User Not Found'
            })
        }
    })
})

router.delete('/delete_req/:p_id/:d_id', authenticate.verifyUser, (req, res) => {
    Request.deleteOne({ p_id: req.params.p_id, d_id: req.params.d_id }, (err) => {
        if (err)
            res.json({
                success: false,
            })
        else
            res.json({
                success: true,
            })
    })
})

module.exports = router;
