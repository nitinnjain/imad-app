var article_name = window.location.pathname.split('/');
alert(article_name)
//firstly check if the user is logged in or not
check_login();

//load all the comments on the article even if the user is not logged in
load_comments();

//if the user is loggedd in then show the dialog box to add a coment
function load_comments_box () {
    var comments_box = document.getElementById('comments_box');
    var add_comments = `
                        <h3>Add a Comment</h3>
                        <textarea id="comments_area" placeholder="Type a comment..." rows="5" cols="100"></textarea>
                        <br/>
                        <input type="submit" value="Submit" id="submit_comment_btn" />
                        <hr/>
    `;
    comments_box.innerHTML = add_comments;
    
    var submit_btn = document.getElementById('submit_comment_btn');
    submit_btn.onclick = function() {
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
            if(request.readyState === XMLHttpRequest.DONE) {
                if(request.status === 200) {
                    load_comments();
                }
                else {
                    alert('There is some error, please try again after some time');
                }
            }
        };
        
        var comment = document.getElementById('comments_area');
        
        request.open('POST', 'http://njain071.imad.hasura-app.io/create-comment' + article_name, true);
        request.send(null);
    };
}

function check_login () {
    var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                load_comments_box();
            }
        }
    };
    
    request.open('GET', 'http://njain071.imad.hasura-app.io/check-login', true);
    request.send(null);
}