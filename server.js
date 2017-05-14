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


app.get("/", function (req, res) {  
    res.send("It's working");
});

app.listen(port, function () {  
    console.log(`Server listening on port ${port}`);
});

