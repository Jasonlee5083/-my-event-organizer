var express = require("express");  
var mscheduleRouter = express.Router();  
var Mschedule = require("../models/mschedule");

mscheduleRouter.route("/")  
    .get(function (req, res) {
        Mschedule.find({user: req.user._id},function (err, mschedules) {
            if (err) res.status(500).send(err);
            res.send(mschedules);
        });
    })
    .post(function (req, res) {
        var mschedule = new Mschedule(req.body);
	    mschedule.user = req.user;
        mschedule.save(function (err, newMschedule) {
            if (err) res.status(500).send(err);
            res.status(201).send(newMschedule);
        });
    });


mscheduleRouter.route("/content")  
	.get(function(req,res){
		Mschedule.find({date: new Date(req.query.date), user: req.user._id},function(err,scheduleArray){
		
			var sendString = "";	
			for (var i = 0; i < scheduleArray.length; i++){
				sendString += " " + scheduleArray[i].event;
			}


			res.send(sendString)
		})
	})
 
mscheduleRouter.route("/:mscheduleId")  
    .get(function (req, res) {
       Mschedule.findOne({_id: req.params.mscheduleId, user: req.user._id}, function (err, mschedule) {
            if (err) res.status(500).send(err);
            if (!mschedule) res.status(404).send("No mschedule item found.");
            else res.send(mschedule);
        });
    })
    .put(function (req, res) {
        Mschedule.findOneAndUpdate({_id: req.params.mscheduleId, user: req.user._id}, req.body, {new: true}, function (err, mschedule) {
            if (err) res.status(500).send(err);
            res.send(mschedule);
      
        });
    })
    .delete(function (req, res) {
		Mschedule.findOneAndRemove({_id: req.params.mscheduleId, user: req.user._id}, function (err, mschedule) {
            if (err) res.status(500).send(err);
            res.send(mschedule);
        });
    });

module.exports = mscheduleRouter;  
