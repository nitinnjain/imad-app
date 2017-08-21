// var login_btn = document.getElementById('login_btn');

// login_btn.onclick = function () {
    
//     //Create a request object
//     var request = new XMLHttpRequest();
    
//     //Capture response and store it in a variable
//     request.onreadystatechange = function() {
//         if(request.readyState === XMLHttpRequest.DONE) {
//             //Take some action
//             if(request.status == 200) {
//                 // alert('user loggedin successfully');
                
//             }
//             else if(request.status == 403) {
//                 alert('username/password incorrect');
//             }
//             else if(request.status == 500) {
//                 alert('Something unexpected happened');
//             }
//         }
//         //Not done yet
//     };
    
//     //Make the request
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;
//     request.open('POST', 'http://njain071.imad.hasura-app.io/login', true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send(JSON.stringify({username: username, password: password}));
// };

// var resgister_btn = document.getElementById('register_btn');

// register_btn.onclick = function () {
    
//     var request = new XMLHttpRequest();
    
//     request.onreadystatechange = function () {
//         if (request.readyState === XMLHttpRequest.DONE) {
//           // Take some action
//           if (request.status === 200) {
//               alert('User created successfully');
//               register_btn.value = 'Registered!';
//           } else {
//               alert('Could not register the user');
//               register_btn.value = 'Register';
//           }
//       }
//     };
    
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;
//     request.open('POST', 'http://njain071.imad.hasura-app.io/create-user', true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send(JSON.stringify({username: username, password: password}));
//     register_btn.vlaue = 'Registering...';
// };

//function to display the page to login or register if not
function login_form() {
    var login_area = document.getElementById('login_area');
    login_area.innerHTML = `
                            <h3>Login/Register to unlock awesome features</h3>
                            <input type="text" id="username" placeholder="Username"/>
                            <input type="password" id="password" placeholder="Password"/>
                            <br/><br/>
                            <input type="submit" id="login_btn" value="Login"/>
                            <input type="submit" id="register_btn" value="Register"/>
    `;
}

//function to display the details of the logged in user
function load_login_details() {
    var login_area = document.getElementById('login_area');
    login_area.innerHTML = `
                            <h3>Hi <i>${username}</i></h3>
                            <a href="/logout">Log out</a>
    `;
}

//function to check if the user is logged in or not
function check_login() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                load_login_details(this.responseText);
            }
            else {
                login_form();
            }
        }
    };
    
    request.open('GET', 'http://njain.imad.hasura-app.io/check-login', true);
    request.send(null);
}
//the first thing to do is check if the user is loggedin or not
check_login();