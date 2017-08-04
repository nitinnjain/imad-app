var button = document.getElementById('counter');

button.onclick = function() {
    
    //Create a request object
    var request = new XMLHttpRequest();
    
    //Capture response and store it in a variable
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if(request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.HTMLcontent = counter.toString();
            }
        }
        //Not done yet
    };
    
    //Make the request
    request.open('GET', 'http://njain071.imad.hasura-app.io/counter', true);
    request.send(null);
};

var nameInput = document.getElementById("name");
var submit = document.getElementById("submit_btn");

submit.onclick = function () {
    alert('working...');
    var names = ['name 1', 'name 2', 'name 3', 'name 4'];
    var list ='';
    
    for(var i = 0; i < names.length; i ++) {
        list += '<li>' + names[i] + '</li>';
    }
    
    var ul = document.getElementById("nameslist");
    ul.innerHTMLlist;
};