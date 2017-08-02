console.log('Loaded!');

 var element = document.getElementById('main-text');
 
 element.innerHTML = 'New Value by text';
 
 var img = document.getElementById('madi');
 img.onclick = function () {
    img.style.marginLeft = '100px';  
 };