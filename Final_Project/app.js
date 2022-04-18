//Variables for connecting to API 
var input = document.querySelector('.input_text');
var main = document.querySelector('#city');
var temp = document.querySelector('.temp');
var button= document.querySelector('.submit');

button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=af6304267fe9e09c11e3bb892f2c3c65')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];

  main.innerHTML = nameValue;
  temp.innerHTML = Math.round((tempValue)-273.15) + " °C";      //convert to Celsius
  //input.value ="";

})

.catch(err => alert("Incorrect! Please enter accurate name"));
})


