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
                span.innerHTML = counter.toString();
            }
        }
        //Not done yet
    };
    
    //Make the request
    request.open('GET', 'http://njain071.imad.hasura-app.io/counter', true);
    request.send(null);
};

$(document).ready(function () {
    
    $('#submit_btn').click(function () {
        
        //Create a request object
        var request = new XMLHttpRequest();
    
        //Capture response and store it in a variable
        request.onreadystatechange = function() {
            if(request.readyState === XMLHttpRequest.DONE) {
                //Take some action
                if(request.status === 200) {
                    alert(name);
                    var names = request.responseText;
                    names = JSON.stringify(names);
                    alert(names);
                    var list ='';
            
                    for(var i = 0; i < names.length; i ++) {
                    list += '<li>' + names[i] + '</li>';
                    }
            
                    var ul = document.getElementById("nameslist");
                    ul.innerHTML = list;
                }
            }
            //Not done yet
        };
        
        var name = $('#name').val();
        //Make the request
        request.open('GET', 'http://njain071.imad.hasura-app.io/submit-name?name=' + name, true);
        request.send(null);
    });
});