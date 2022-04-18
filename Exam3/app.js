var input = document.querySelector('#input');
var searchBtn = document.querySelector('#search');
var apiKey = '7d3ec1a4-bd4b-4d6f-8d41-1de6c25106f6';
var notFound = document.querySelector('.not__found');
var defBox = document.querySelector('.def');
var audioBox = document.querySelector('.audio');
var loading = document.querySelector('.loading');
var art = document.querySelector('.img');

searchBtn.addEventListener('click', function(e){
    e.preventDefault();

    // clear data 
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';

    // Get input data
    var word = input.value;
    // call API get data
    if (word === '') {
        alert('Word is required');
        return;
    }

    getData(word);
})


async function getData(word) {
    loading.style.display = 'block';
    // Ajax call 
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
    const data = await response.json();
    // if word doesn't exist
    if (!data.length) {
        loading.style.display = 'none';
        notFound.innerText = ' No result found';
        return;
    }

    // When result is found
    loading.style.display = 'none';
    var defination = data[0].shortdef[0];
    defBox.innerText = defination;


    // Sound 
    const soundName = data[0].hwi.prs[0].sound.audio;
        if(soundName) {
            renderSound(soundName);
        }

        
    // Art
    const artName = data[0].art.artid;
        if(artName){
            image(artName);
        }
        else if (!artName){
            var img = document.createElement('img');
            img.src = "no_image.png";
            art.appendChild(img);
        }

    
}

function renderSound(soundName) {
    var subfolder = soundName.charAt(0);
    var soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    var aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);

}

function image(artName){
    var artSrc = `https://www.merriam-webster.com/assets/mw/static/art/dict/${artName}.gif?key=${apiKey}`;

    var img = document.createElement('img');
    img.src = artSrc;
    art.appendChild(img);
}

