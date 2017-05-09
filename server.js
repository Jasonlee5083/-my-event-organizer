// server.js
var express = require("express");  
var app = express();  
var path = require("path");  
var morgan = require("morgan");  
var mongoose = require("mongoose");  
var bodyParser = require("body-parser");
var config = require("./config");  
var expressJwt = require("express-jwt");

var port = process.env.PORT || 9000;

mongoose.connect(config.database);  

app.use(morgan("dev"));  
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", expressJwt({secret: config.secret}));
app.use("/api/mschedule",require("./routes/mscheduleRoutes"));

app.use("/auth", require("./routes/authRoutes"));  

//app.use("/mschedule", require("./routes/mscheduleRoutes"));  
//mongoose.connect("mongodb://localhost/mschedule", function (err) {  
//    if (err) throw err;
//    console.log("Successfully connected to the database");
//});

app.get("/", function (req, res) {  
    res.send("It's working");
});

app.listen(port, function () {  
    console.log(`Server listening on port ${port}`);
});


//
//var express = require("express");
//var bodyParser = require("body-parser");
//var mongoose = require("mongoose");
//var path = require("path");
//var scheduleRoute = require("./routes/scheduleRoutes");
//
//
//var port = 3800;
//var app = express();
//
//mongoose.connect("mongodb://localhost/schedule",function(err){
//	if (err) throw err;
//	console.log("connected to DB")
//})
//
//app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname,"public")));
//app.use("/schedule", scheduleRoute);
//
//app.listen(port, function(){
//	console.log ("servers up at 3800");
//});
