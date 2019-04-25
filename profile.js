"use strict";

(function() {
    window.onload = function() {
        console.log("connected");
        // var url = window.location.hostname;
        var protocol = location.protocol;
var slashes = protocol.concat("//");
var host = slashes.concat(window.location.hostname);
        // let params = url.split('?')[1].split('&');
        // let data = {}, tmp;
        console.log(host);
        // for (var i = 0, l = params.length; i < l; i++) {
        //     tmp = params[i].split('=');
        //     data[tmp[0]] = tmp[1];
        // }
        // console.log(data.name);
        // document.getElementById('here').innerHTML = data.name;
        // callAjax();
    };

    function callAjax(){
        console.log("call to ajax");
		let url = "http://localhost:3000";
	
		fetch(url)
		.then(checkStatus)
		.then(function(responseText) {
            // console.log(responseText);
            // let data = JSON.parse(responseText);
            // console.log(data);
            // processJSON(data);
            // // window.location='profile.html';
            // console.log(data["NAME"]);
            // document.getElementById("name").innerHTML = data["NAME"];
		})
		.catch(function(error) {
			console.log(error);
		});
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