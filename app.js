"use strict";

var app = require("express")();
var moment = require("moment");
var path = require("path");

app.set("port", process.env.PORT || 3000);
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

function printJSON(res, natural, unix){
	res.json({
		"natural": natural,
		"unix": unix
	});
}

app.get("/", function (req, res) {
	res.render("index");
});

app.get("/:str", function (req, res) {
	var str = req.params.str;
	var natural;
	var unix;

	if(Number.isNaN(parseInt(str))) {
		//str is natural
		natural = str;
		unix = moment(str).utc().format("X");
	} else {
		//str is unix
		natural = moment(+str * 1000).utc().format("MMMM DD, YYYY");
		unix = str;
	}

	if(natural === "Invalid date" || unix == "Invalid date"){
		return printJSON(res, null, null);
	}

	printJSON(res, natural, unix);
	
});

app.listen(app.get("port"), function() {
  console.log("App started on port " + app.get("port"));
});
