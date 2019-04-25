"use strict";

(function() {
    // document.write("<sript type")
    window.onload = function() {
        // document.getElementById("login").onclick = login;
        document.getElementById("login").onclick = enter;
        document.getElementById("logout").onclick = logout;
        // callAjax();
        // start();
        // document.getElementById("create").onclick = createAccount;
    };

    function login() {
        let userName = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        console.log(userName);
        console.log(password);
        let url =  "http://localhost:3000";
        // let url = "http://localhost:3000?userName="+userName+"&password="+password;

        checkPassword(url);

        // check that username exists 
        // and password is correct
        // fetch all of the users information and display on page
        // let query = "SELECT password FROM login WHERE name = " + userName + ";";

        // fetch(url)
        //     .then(checkStatus) 
        //     .then(function(responseText) {
        //         let json = JSON.parse(responseText);
        //         console.log(json);

        //         // if(json.length == 0){
        //         //     errorMessage(first, last);
        //         // }else{
        //         //     processInfo(first, last, json);
        //         // }

        //     }) .catch(function(error) {
        //         console.log(error);
        //     });
    }

    function logout() {
        document.getElementById("main").innerHTML = "";

    }

    function checkPassword(url) {
        fetch(url)
        .then(checkStatus) 
        .then(function(responseText) {
            console.log("connected");
            // let data = JSON.parse(responseText);
            // let cover = document.getElementById("cover");
            // cover.src = "books/" + bookID + "/cover.jpg";
            // let title = document.getElementById("title");
            // title.innerHTML = data.title;

            // let author = document.getElementById("author");
            // author.innerHTML = data.author;
            // let stars = document.getElementById("stars");
            // stars.innerHTML = data.stars; 
        }) .catch(function(error) {
        });
    }

    function enter() {
		let name = document.getElementById("username").value;
		let password = document.getElementById("password").value;
        let url = "http://localhost:3000";
        
        // let url = "http://localhost:3000?first="+name+"&last="+password;
        // document.location.href = url;

        // var locate = window.location;

        // document.name.password.value = locate;

        // var text = document.name.password.value
        // console.log(url);
	
		const info = {name: name, 
					 password: password};
	
		const fetchOptions = {
			method : 'POST',
			headers : {
				'Accept': 'application/json',
				'Content-Type' : 'application/json'
			},
            body : JSON.stringify(info)
            
        };
	
		fetch(url, fetchOptions)
			.then(checkStatus)
			.then(function(responseText) {
                // console.log("RESPONSE TEXT");
                // responseText = responseText.replace("/profile", "");
                let data = JSON.parse(responseText);
            console.log(data);
            // processJSON(data);
            // console.log(data);
            document.getElementById("account").innerHTML = "";
            document.getElementById("name").innerHTML = data["NAME"];
            document.getElementById("lastname").innerHTML = data["LAST"];
            document.getElementById("age").innerHTML = data["AGE"];
            document.getElementById("class").innerHTML = data["CLASS"];
                // console.log(responseText["NAME"]);
                
                // window.location.href ='profile.html';

                // console.log(responseText);
			})
			.catch(function(error) {
				console.log(error);
			});
    }
    
    function callAjax(){
		let url = "http://localhost:3000";
	
		fetch(url)
		.then(checkStatus)
		.then(function(responseText) {
            // let data = JSON.parse(responseText);
            // console.log(data);
            // processJSON(data);
            window.location='profile.html';
		})
		.catch(function(error) {
			console.log(error);
		});
	}


    function createAccount() {
        // get info from fields
        // check that username doesnot already exist in db
        // if user available write info from user to the file 
        // 
        let username = document.getElementById("username");
        let name = document.getElementById("name");
        let lastname = document.getElementById("last");
        let email = document.getElementById("email");
        let age = document.getElementById("age");
        let description = document.getElementById("descript");


    }

    function checkStatus(response) {
        // console.log(response.status);
        if (response.status >= 200 && response.status < 300) {
            return response.text(); 
        } else if(response.status == 410) {
            let error = document.getElementById("errors");
            error.innerHTML = "Incorrect username or password";
            return Promise.reject(new Error("Incorrect username or password"));
        } else if(response.status == 404) {
            let error = document.getElementById("errors");
            error.innerHTML = "ERROR: Page not found";
            return Promise.reject(new Error("sorry we do not have any data"));
        } else {
            return Promise.reject(new Error(response.status+ ":" +response.statusText));
        }    
    }

})();
