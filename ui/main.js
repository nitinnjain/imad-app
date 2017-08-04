// var button = document.getElementById('counter');

// button.onclick = function() {
    
//     //Create a request object
//     var request = XMLHttpRequest();
    
//     //Capture response and store it in a variable
//     request.onreadystatechange = function() {
//         if(request.readyState === XMLHttpRequest.DONE) {
//             //Take some action
//             if(request.status === 200) {
//                 var counter = responseText;
//                 var span = document.getElementById('count');
//                 span.HTMLcontent = counter.toString();
//             }
//         }
//         //Not done yet
//     };
    
//     //Make the request
//     request.open('GET', 'http://njain071.imad.hasura-app.io/counter', true);
//     request.end(null);
// };

var button = document.getElementById("counter");

var counter = 0;
button.onclick = function () {
    counter = counter + 1;
    var span = document.getElementById("count");
    span.innerHTML = counter.toString();
};