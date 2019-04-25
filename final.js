/**
 * Patricia Lemmen Meyer, Jorge Gomez Del Campo
 * CSC 337, Spring 2019
 * Final project
 * 
 * javascript for the login website. Uses AJAX to send and get information from the
 * server and then displays it on the page using HTML DOM.
 */

(function() {
    "use strict";

    /**
     * function initializes buttons
     */
    window.onload = function() {
        document.getElementById("login").onclick = enter;
        document.getElementById("logout").onclick = logout;
    };

    /**
	 * clears the screen when the users clicks the 'logout' button and shows a confirmation message.
	 */
    function logout() {
        document.getElementById("main").innerHTML = "You succesfully logged out!";
    }

    /**
	 * sends username and password entered by the user to the server and checks if it is correct.
     * then the server sends back information about the user which is then entered into the page
     * using HTML DOM.
	 */
    function enter() {
		let name = document.getElementById("username").value;
		let password = document.getElementById("password").value;
        let url = "http://localhost:3000";
        
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
                let data = JSON.parse(responseText);
                document.getElementById("account").innerHTML = "";
                document.getElementById("name").innerHTML = data["NAME"];
                document.getElementById("lastname").innerHTML = data["LAST"];
                document.getElementById("age").innerHTML = data["AGE"];
                document.getElementById("class").innerHTML = data["CLASS"];
			})
			.catch(function(error) {
				console.log(error);
			});
    }

    /**
	 * returns the response text for the page
	 * 
	 * @param {String} response what the server sends back
	 * 
	 * @return {Sgring} response text or error message
	 */
    function checkStatus(response) {
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
