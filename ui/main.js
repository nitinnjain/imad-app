var submit = document.getElementById('submit_btn');

submit.onclick = function () {
    
    //Create a request object
    var request = new XMLHttpRequest();
    
    //Capture response and store it in a variable
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if(request.status == 200) {
                alert('user loggedin successfully');
            }
            else if(request.status == 403) {
                alert('username/password incorrect');
            }
            else if(request.status == 500) {
                alert('Something unexpected happened');
            }
        }
        //Not done yet
    };
    
    //Make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://njain071.imad.hasura-app.io/create-user', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};