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

// var login_btn = document.getElementById('login_btn');
        
// login_btn.onclick = function () {
    
//     //Create a request object
//     var request = new XMLHttpRequest();
    
//     //Capture response and store it in a variable
//     request.onreadystatechange = function() {
//         if(request.readyState === XMLHttpRequest.DONE) {
//             // Take some action
//             if (request.status === 200) {
//                 submit.value = 'Sucess!';
//             } else if (request.status === 403) {
//                 submit.value = 'Invalid credentials. Try again?';
//             } else if (request.status === 500) {
//                 alert('Something went wrong on the server');
//                 submit.value = 'Login';
//             } else {
//                 alert('Something went wrong on the server');
//                 submit.value = 'Login';
//             }
//             loadLogin();
//         }
//         //Not done yet
//     };
    
//     //Make the request
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;
//     request.open('POST', 'http://njain071.imad.hasura-app.io/login', true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send(JSON.stringify({username: username, password: password}));
//     login_btn.value = 'Logging in...';
// };

function load_articles () {}

function register_user() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                alert(this.response);
                load_articles(this.response);
            }
        }
    };
    
    request.open('GET', 'http://njain071.imad.hasura-app.io/get-articles', true);
    request.send(null);
}

register_user();