//this js file is for the articles section

//firstly check if the user is logged in or not
check_login();

//if the user is loggedd in then show the dialog box to add a coment
function load_comments_box () {
    var comments_box = document.getElementById('comments_box');
    var add_comments = `
                        <h3>Add a Comment</h3>
                        <textarea id="comments_area" placeholder="Type a comment..." rows="5" cols="100"></textarea>
                        <hr/>
                        <input type="submit" value="Submit" id="submit_comment_btn" />
    `;
    comments_box.innerHTML = add_comments;
}

check_login() {
    var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                load_comments_box();
            }
        }
    };
    
    request.open('GET', 'http://njain071.imad.hasura-app.io/check-login', true);
    request.send();
}