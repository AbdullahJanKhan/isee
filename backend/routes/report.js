var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate')
var Report = require('../models/report')
/* GET home page. */
router.post('/save_report', authenticate.verifyUser, (req, res) => {
    const report = new Report({
        u_id: req.user._id,
        title: req.user.fname + ' ' + Date.now(),
        report: req.body.data,
    })
    report.save((err, rep) => {
        if (err) res.json({ success: false, message: 'Report Not Saved' })
        else res.json({ success: true, message: 'Report Saved', report: rep })
    })
})

router.get('/get_reports_list', authenticate.verifyUser, (req, res) => {
    Report.find({ u_id: req.user._id }, (err, reps) => {
        if (err) res.json({ success: false, message: err.name })
        else if (reps.length > 0) res.json({ success: true, reports: reps })
        else res.json({ success: false, message: 'No Reports' })
    })
})
module.exports = router;
