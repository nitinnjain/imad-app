console.log('Loaded!');
$(document).ready(function () {
     var element = document.getElementById('main-text');
 
 element.innerHTML = 'New Value by text';
 
 var img = document.getElementById('madi');
 
 marginLeft = 0;
 function moveRight () {
     marginLeft = marginLeft + 1;
     img.style.marginLeft = marginLeft + 'px';
 }
 img.onclick = function () {
    var interval = setInterval(moveRight, 10);
 };
});