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

show_articles();
check_login();

function load_user_details(username) {
    var login_area = document.getElementById('login');
    login_area.innerHTML = `
                            <h3>Hi<i>${username}</i></h3>
                            <a href="/logout">Logout</a>
    `;
}

function login_form() {
    var login_area = document.getElementById('login');
    var loginHtml = `
        <h3>Login/Register to unlock awesome features</h3>
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" />
        <br/><br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        `;
    document.getElementById('login').HTML = loginHtml;
    alert(loginHtml);
}

function check_login() {
    var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var data = this.responseText;
                console.log(data);
                load_user_details(data);
            }
            else {
                login_form();
            }
        }
    };
    
    request.open('GET', 'http://njain071.imad.hasura-app.io/check-login', true);
    request.send();
}

function show_articles() {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if(request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for(var i = 0; i < articleData.length; i++) {
                    content += `<li>
                                <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                                (${articleData[i].date.split('T')[0]})
                                </li>
                    `;
                }
                content += '</li>';
                articles.innerHTML = content;
            }
            else {
                articles.innrHTML = 'OOPS sorry couldn\'t load the data';
            }
        }
    };
    
    request.open('GET', 'http://njain071.imad.hasura-app.io/get-articles', true);
    request.send();
}