
var mongoose = require("mongoose");  
var Schema = mongoose.Schema;

var mscheduleSchema = new Schema({  
  user:{ type: Schema.Types.ObjectId,
		   ref : "User",
			required : true
		 },
	event:String,

//	event: {
//		type:String,
//		required:true
//	},
	place: {
		name: String,
		lat: Number,
		lng: Number
	},
//	place:{
//		type:String,
//		required:true
//	},
	//	place:String,

	date: Date,
//	date:{
//		type:String,
//		required:true
//	},
	stime:String,
	etime:String,
	description:String

});

module.exports = mongoose.model("Mschedule", mscheduleSchema);  


//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//
//var scheduleSchema = new Schema({
//	event:String,
//	place:String,
//	date:String,
//	stime:String,
//	etime:String,
//	description:String,
//	
//})
//
//var Schedule = mongoose.model('Schedule', scheduleSchema);
//
//module.exports = Schedule;