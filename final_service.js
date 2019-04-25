/**
 * Patricia Lemmen Meyer, Jorge Gomez Del Campo
 * CSC 337, Spring 2019
 * Final project
 * 
 * server for login website. This server connects to a database to retrive information
 * like username and passsword to make sure that they are correct. The server also uses
 * express to comunicate with the javascript file and send the corresponding information to
 * the page.
 */
"use strict";
const express = require("express");
const app = express();
let mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
let username;
let password;

app.use(express.static('public'));

let con = mysql.createConnection({
	host: "localhost",
	database: "login",
	user: "root",
	password: "CS2019arizona",
	debug: "true"
});

console.log("Service started...");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('public'));

app.get('/profile', function(req, res) {
    res.sendFile(__dirname + "/profile.html");
  });

app.get('/', jsonParser, function (req, res) { 
    res.header("Access-Control-Allow-Origin", "*");
});

app.post('/', jsonParser, function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	username = req.body.name;
    password = req.body.password;

    let data = {
        "PROFILE": "",
        "NAME": "",
        "LAST": "",
        "AGE": "",
        "CLASS": ""
    }

    con.query("SELECT password FROM password WHERE username = '"
     + username + "';", function(err, result){
        if(err) throw err;
            if (result[0]["password"] == password) {
                console.log("CORRECT PASSWORD");
                data["PROFILE"] = "/profile";
                if (res.status === 301 || res.status === 302) {
                    window.location = res.headers.Location;
                }
            } else {
                console.log("INCORRECT PASSWORD");
                res.status(410);
            }
            console.log(result);
        });

        con.query("SELECT * FROM personal WHERE username = '" + username
         + "';", function(err, result){
            if(err) throw err;               
                data["NAME"] = result[0]["fistname"];
                data["LAST"] = result[0]["lastname"];
            });

            con.query("SELECT * FROM info WHERE username = '" + username
             + "';", function(err, result){
                if(err) throw err;
                    data["AGE"] = result[0]["age"];
                    data["CLASS"] = result[0]["class"];
                    res.json(data);
                });
});
app.listen(3000);
