var express = require('express');
var router = express.Router();
var TipCat = require('../models/tipcat')
var TipDetail = require('../models/tipDetail')
var authenticate = require('../authenticate')

router.post('/add_tip_category', (req, res) => {
    var category = new TipCat({
        category: req.body.category
    })
    category.save((err) => {
        if (err)
            res.json({
                success: false,
                message: err.name
            })
        else
            res.json({
                success: true,
                message: 'New Category Added'
            })
    })
})

router.post('/add_tip_detail', authenticate.verifyUser, (req, res) => {
    var tip = new TipDetail({
        cat_id: req.body.id,
        title: req.body.title,
        text: req.body.text,
        intellien: true
    })
    tip.save((err, tip) => {
        if (err)
            res.json({
                success: false,
                message: err.name
            })
        else
            res.json({
                success: true,
                message: 'Tip Added',
                tip: tip
            })
    })
})

module.exports = router;
