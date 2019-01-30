/*
to run server:
node src/models/server.js
*/

//Initialize Server
const request = require('request');
const express = require('express');
const cors = require('cors');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const app = express()
const port = 3001
const bodyParser = require('body-parser')

const db = require('./databases');

//Tyler's Cap1API
const key = "a36c15316b48acb42a12d86f36ec6899" 

app.use(cors());

//Check account balances
// localhost:3001/balance?email=[email]
app.get('/balance', function(req, res) {

	const email = req.query.email;

	var checkingID;
	var savingsID;
	db.getItem(email).then((data) => {
		checkingID = JSON.parse(data.Item.info).checkingsID;
		savingsID = JSON.parse(data.Item.info).savingsID;
		console.log("THIS IS FROM 10:17: " + checkingID + " " + savingsID);

		var checkingBalance = 0;
		var savingsBalance = 0;

		//Get Checking Balance
		var url = "http://api.reimaginebanking.com/accounts/" + checkingID + "?key=" + key;

		var balances = {checking: 0, savings: 0};

	    fetch(url)
	    .then(response => response.json())
	    //If valid account, get balance
	    .then(function(json) {
	        checkingBalance = json.balance.toString();
	        balances.checking = checkingBalance;
	        console.log(checkingBalance);
	    })
	    //If invalid account, abort w/ error
	    .catch(function(error) {
	        console.log(error);
	        res.send("400")
	    })

	    //Get Savings Balance
	    var url = "http://api.reimaginebanking.com/accounts/" + savingsID + "?key=" + key;

	    fetch(url)
	    .then(response => response.json())
	    //If valid account, get balance
	    .then(function(json) {
	        var savingsBalance = json.balance.toString();
	        console.log(savingsBalance);
	        balances.savings = savingsBalance;
	        res.json(balances);
	    })
	    //If invalid account, abort w/ error
	    .catch(function(error) {
	        console.log(error);
	        res.send("400")
	    })


	}).catch((err) => {
		console.log(err)
	})
	
})

// transfer money between checking + savings account
// localhost:3001/transfer?email=[email]&transferAmt=[transferAmt]

app.get('/transfer', function(req, res) {
	//access info from database using email
	var email = req.query.email;
	var transferAmt = parseInt(req.query.transferAmt);

	var checkingID;
	var savingsID;

	db.getItem(email).then((data) => {
		checkingID = JSON.parse(data.Item.info).checkingsID;
		savingsID = JSON.parse(data.Item.info).savingsID;
		console.log("THIS IS FROM 11:13: " + checkingID + " " + savingsID);

		//Initialize Date
		var today = new Date();
		var dd = today.getDate().toString();
		var mm = (today.getMonth() + 1).toString(); //January is 0!
		var yyyy = today.getFullYear().toString();
		var today = yyyy + "-" + mm + "-" + dd; //format = "2019-01-11"

		var url = "http://api.reimaginebanking.com/accounts/" + checkingID + "/transfers?key=" + key;
		fetch(url, {
		    method: 'POST',
		    body: JSON.stringify({
		      medium: 'balance',
		      payee_id: checkingID,
			  transaction_date: today,
			  status: "pending",
			  amount: transferAmt
		    }),
	    headers: {"Content-type": "application/json; charset=UTF-8"}
		})
		.then(response => response.json())
		.then(function(json) {
			console.log(json);
			res.send(json);
		})
	    //If invalid account, abort w/ error
	    .catch(function(error) {
	        console.log(error);
	        res.send("400");
	    })
	}).catch((err) => {
		console.log(err)
	})
})

//get user information (i.e. # of streaks)
//localhost:3000/user?email=[email]
app.get('/user', function(req, res) {

	var email = req.query.email;

	var savings_goal = 1000;
	var streaks = 5;
	var progress = 50;
	var forest = 0;

	db.getItem(email).then((data) => {
		savings_goal = data.Item.goal;
		streaks = data.Item.streaks;
		progress = data.Item.progress;
		forest = data.Item.forest;
		
		res.json({
			goal: savings_goal,
			streaks: streaks,
			progress: progress,
			forest: forest
		})
	}).catch((err) => {
		console.log(err)
	})
	
})

app.get('/friends', function(req, res) {

	var email = req.query.email;

	var streaks = 5;
	var forest = 0;
	var progress = 50;

	db.getItem(email).then((data) => {
		streaks = data.Item.streaks;
		progress = data.Item.progress;
		forest = data.Item.forest;
		
		res.json({
			streaks: streaks,
			forest: forest,
			progress: progress
		});
	}).catch((err) => {
		console.log(err)
	})
})

app.listen(port, () => {console.log("listening on port " + port.toString())})
