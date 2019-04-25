"use strict";
const express = require("express");
const app = express();
const fs = require("fs");
var mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
let username;
let password;

app.use(express.static('public'));

var con = mysql.createConnection({
	host: "localhost",
	database: "login",
	user: "root",
	password: "CS2019arizona",
	debug: "true"
});

console.log("Service started...");

// app.get('/login', function(req, res) {
//     res.render('helloworld', { title: 'Hello, World!' });
// });

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", 
//                "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });

// app.use(express.static('public'));

// app.get('/',function(req,res){
//     res.sendfile("final.html");
//   });


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('public'));

app.get('/', jsonParser, function (req, res) { 
    res.header("Access-Control-Allow-Origin", "*");
})

app.post('/', jsonParser, function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	username = req.body.name;
    password = req.body.password;

    let data = {
        "DATA": ""
    }

    con.query("SELECT password FROM password WHERE username = '" + username + "';", function(err, result){
        if(err) throw err;
            if (result[0]["password"] == password) {
                console.log("CORRECT PASSWORD");
                filePath = __dirname + '/public/' + /^([a-zA-Z]+)[0-9]*\.*[a-zA-Z0-9]+$|^[a-zA-Z]+[0-9]*$/;
                if (path.existsSync(filePath)) {
                    res.sendfile(filePath);
                } else {
                res.statusCode = 404;
                res.write('404 sorry not found');
                res.end();
                }
            } else {

                console.log("INCORRECT PASSWORD");
            }
            console.log(result);
            res.send(result);
        });

    // con.query("SELECT password FROM password WHERE username = '" + username + "';",function(err, rows, fields){
    //     if(rows.length != 0){
    //         data["Data"] = "Successfully logged in..";
    //         res.json(data);
    //     }else{
    //         data["Data"] = "Email or password is incorrect.";
    //         res.json(data);
    //     }
    // });

    // res.send(username);
    
    // res.send(username + " " + password);

    // con.connect(function(err) {
	// 	if (err) throw err;
    //     console.log("Connected!");
    //     // console.log()
    //     con.query("SELECT password FROM password;", 
    //                 function (err, result, fields) {
    //                     // con.release();
    //                     if (err) throw err;
    //                     // if(result == password){
    //                     //     console.log("correct password");
    //                     //     console.log(result);
    //                     //     res.send(result);
    //                     // } else {
    //                     //     console.log("incorrect password");
    //                     //     console.log(result);
    //                     // }
    //         			// console.log(result);
    //         			res.send(username +  "     " + password);
    //                 });
    //             });

	// fs.appendFile("messages.txt", name+":::"+message+"***", function(err) {
    // 	if(err) {
	// 		res.status(400);
    // 	}
    // 	console.log("The file was saved!");
    // 	res.send("Success!");
	// });

})

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("SELECT password FROM password;", function (err, result) {
//       if (err) throw err;
//       console.log("Result: " + result);
//     });
//   });

// con.connect(function(err) {
// 		if (err) throw err;
//         console.log("Connected!");
//         // console.log()
//         con.query("SELECT password FROM password;", 
//                     function (err, result, fields) {
//                         // con.release();
//                         if (err) throw err;
//                         console.log(username);
//                         // if(result == password){
//                         //     console.log("correct password");
//                         //     console.log(result);
//                         //     res.send(result);
//                         // } else {
//                         //     console.log("incorrect password");
//                         //     console.log(result);
//                         // }
//             			// console.log(result);
//             			// res.send(username +  "     " + password);
//                     });
//                 });

// app.get('/', jsonParser, function (req, res) { 
//     res.header("Access-Control-Allow-Origin", "*");
    
    // const queryParams = req.query;
	// var userName = queryParams.name;
    // var password = queryParams.password;
    // let name = req.body.name;
    // let password = req.body.password;
    // console.log(name + " " + password);
    
    // console.log(userName);
    // console.log(password);


	// con.connect(function(err) {
	// 	if (err) throw err;
    //     console.log("Connected!");
    //     // console.log()
    //     con.query("SELECT password FROM password;", 
    //                 function (err, result, fields) {
    //                     // con.release();
    //                     if (err) throw err;
    //                     // if(result == password){
    //                     //     console.log("correct password");
    //                     //     console.log(result);
    //                     //     res.send(result);
    //                     // } else {
    //                     //     console.log("incorrect password");
    //                     //     console.log(result);
    //                     // }
    //         			// console.log(result);
    //         			// res.send(username +  "     " + password);
    //                 });
    //             });
            // });

// con.connect(function(err) {
//     		if (err) throw err;
//             console.log("Connected!");
//             // console.log()
//             con.query("SELECT password FROM password;", 
//                         function (err, result, fields) {
//                             // con.release();
//                             if (err) throw err;
//                             // if(result == password){
//                             //     console.log("correct password");
//                             //     console.log(result);
//                             //     res.send(result);
//                             // } else {
//                             //     console.log("incorrect password");
//                             //     console.log(result);
//                             // }
//                 			console.log(result);
//                 			res.send(result);
//                 		});
                    // })
// app.get('/', function (req, res) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.send(JSON.stringify();
// })

/**
 * adds data from a file to a map.
 */
function data(){
	let messages = {};
	let data = [];
	let file = fs.readFileSync("messages.txt", "utf8").split("***");

	for(var i = 0; i < file.length; i++){
		let set = {};
		let line = file[i].split(":::");
		if(line[0] == ""){
			continue;
		}
		set["name"] =  line[0];
		set["comment"] =  line[1];
		data.push(set);
	}
	messages["messages"] = data;
	return messages;
}

app.listen(3000);








// app.get('/', function (req, res) { 
//     res.header("Access-Control-Allow-Origin", "*");

// app.post('/',function(req,res){
//     var user_name=req.body.user;
//     var password=req.body.password;
//     console.log("User name = "+user_name+", password is "+password);
//     res.end("yes");
//   });



// // app.get('/', function (req, res) { 
// //     res.header("Access-Control-Allow-Origin", "*");
    
// //     const queryParams = req.query;
// // 	var userName = queryParams.userName;
// // 	var password = queryParams.password;
    
// //     console.log(userName);
// //     console.log(password);


// // 	con.connect(function(err) {
// // 		if (err) throw err;
// //         console.log("Connected!");
// //         // console.log()
// //         con.query("SELECT password FROM password;", 
// //                     function (err, result, fields) {
// //                         // con.release();
// //                         if (err) throw err;
// //                         // if(result == password){
// //                         //     console.log("correct password");
// //                         //     console.log(result);
// //                         //     res.send(result);
// //                         // } else {
// //                         //     console.log("incorrect password");
// //                         //     console.log(result);
// //                         // }
// //             			console.log(result);
// //             			res.send(result);
// //             		});

		
// // 		// var mode = queryParams.mode;

// // 		// let string1 = "Select m.name, m.year, actor2.first_name, actor2.last_name ";
// // 		// let string2 = "FROM movies m JOIN roles r1 ON m.id = r1.movie_id ";
// // 		// let string3 = "JOIN actors kev ON r1.actor_id = kev.id JOIN roles r2 ON m.id = r2.movie_id ";
// // 		// let string4 = "JOIN actors actor2 ON r2.actor_id = actor2.id WHERE kev.first_name = 'Kevin' and kev.last_name = 'Bacon' "
// // 		// let string5 = "and actor2.first_name = "+"'"+first+"'"+" and actor2.last_name = "+"'"+last+"'"+" ORDER by year DESC";

// // 		// if(mode == "withkevinbacon"){
// // 		// con.query(string1+string2+string3+string4+string5, 
// // 	    //         function (err, result, fields) {
// // 		// 			if (err) throw err;
// // 		// 			console.log(result);
// // 		// 			res.send(result);
// // 		// 		});

// // 		// }else if(mode == "allActorsMovies"){
// // 		// 	con.query("SELECT s.id, s.first_name, s.last_name, g.movie_id, a.name, a.year FROM actors s JOIN roles g ON s.id = g.actor_id JOIN movies a ON g.movie_id = a.id WHERE s.first_name="+ "'"+first+"'"+"and s.last_name="+"'"+last+"'"+" ORDER by year DESC", 
// // 	    //         function (err, result, fields) {
// // 		// 			if (err) throw err;
// // 		// 			res.send(result);
// // 		// 		});
// // 		// }
// // 	});
// });
// app.listen(3000);

// to write info from user to a file
// app.post('/', jsonParser, function (req, res) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	let name = req.body.name;
// 	let message = req.body.message;

// 	fs.appendFile("messages.txt", name+":::"+message+"***", function(err) {
//     	if(err) {
// 			res.status(400);
//     	}
//     	console.log("The file was saved!");
//     	res.send("Success!");
// 	});

// })




// var mysql = require('mysql');
// var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var path = require('path');


// var app = express();
// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());

// app.get('/', function(request, response) {
// 	response.sendFile(path.join(__dirname + '/final.html'));
// });

// app.post('/auth', function(request, response) {
// 	var username = request.body.username;
// 	var password = request.body.password;
// 	if (username && password) {
// 		connection.query('SELECT * FROM password WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
// 			if (results.length > 0) {
// 				request.session.loggedin = true;
// 				request.session.username = username;
// 				response.redirect('/home');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });

// app.get('/home', function(request, response) {
// 	if (request.session.loggedin) {
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

// app.listen(3000);