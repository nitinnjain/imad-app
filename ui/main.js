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

//function which is being called very firstly to show the artivcle
show_articles();
//function which is being called very firstly to check if the user is logged in or not
check_login();

//function to load the user data and link to logout
function load_user_details(username) {
    var login_area = document.getElementById('login_area');
    login_area.innerHTML = `
                            <h3>Hi ${username}</h3>
                            <a href="/logout">Logout</a>
    `;
}

//function to provide the user with a login page to either login or register
function login_form() {
    var login_area = document.getElementById('login_area');
    var loginHtml = `
        <h3>Login/Register to unlock awesome features</h3>
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" />
        <br/><br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        `;
    login_area.innerHTML = loginHtml;
    
    var login = document.getElementById('login_btn');
    login.onclick = function () {
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
            if(request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                login.value = 'Sucess!';
            } else if (request.status === 403) {
                login.value = 'Invalid credentials. Try again?';
            } else if (request.status === 500) {
                alert('Something went wrong on the server');
                login.value = 'Login';
            } else {
                alert('Something went wrong on the server');
                login.value = 'Login';
            }
            check_login();
            }
        };
        
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        request.open('POST', 'http://njain071.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));
        login.value = 'Logging in...';
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
            if(request.readyState === XMLHttpRequest.DONE) {
                if(request.status === 200) {
                    alert('User created successfully');
                    register_btn.value = 'Registered!';
                } 
                else {
                    alert('Could not register the user');
                    register_btn.value = 'Register';
                }
            }
        };
        
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        console.log(username);
        console.log(password);
        
        request.open('POST', 'http://njain01.imad.hasura-app.io/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));
        register.value = 'Registering...';
    };
}

//function to check if the user is logged in or not
function check_login() {
    var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var data = this.responseText;
                alert(data);
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

//function to show the articles list on the main page
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
                content += '</li></ul>';
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