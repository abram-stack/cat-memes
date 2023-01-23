import { catsData } from './data.js';

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOption = document.getElementById('gifs-only-option')

const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightRadio)
getImageBtn.addEventListener('click', renderCat)
memeModalCloseBtn.addEventListener('click', closeModal)

function closeModal() {
    memeModal.style.display = 'none'    
}


function renderCat() {
    const isGif = gifsOption.checked;
    if (document.querySelector('input[type="radio"]:checked')) { 
        const selectedRadio = document.querySelector('input[type="radio"]:checked').value
        console.log(selectedRadio, isGif);

        //filter the cats from catarray that have the mood
        const selectedCats = catsData.filter(function (cat) {
            if(isGif)
                return cat.emotionTags.includes(selectedRadio) && cat.isGif
            else
                return cat.emotionTags.includes(selectedRadio)
        })

        //get single object of cats 
        console.log(selectedCats);
        if (selectedCats.length === 1) {
            // console.log(selectedCats[0]);
            memeModalInner.innerHTML = 
            `
            <img 
                class="cat-img" 
                src="./images/${selectedCats[0].image}"
                alt="${selectedCats[0].alt}"
                >
            `
            memeModal.style.display = 'flex'
        }
        else {
            const randomCatsIndex = Math.floor(Math.random() * selectedCats.length)
            // console.log(selectedCats[randomCatsIndex])
            
            memeModalInner.innerHTML = `
            <img 
                class="cat-img" 
                src="./images/${selectedCats[randomCatsIndex].image}"
                alt="${selectedCats[randomCatsIndex].alt}"
                >
            `
            memeModal.style.display = 'flex'

        }
    }
    
}

function highlightRadio(e) {
    const radios = document.getElementsByClassName('radio');

    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}
function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags)
            if (!emotionsArray.includes(emotion))
                emotionsArray.push(emotion)
    }
    return emotionsArray;
}

function renderEmotion(cats) { 
    let string = '';
    const emotions = getEmotionsArray(cats);
    
    for (let emotion of emotions) {
        string += `
        <div class='radio'>
            <label for='${emotion}'>${emotion}</label>
            <input 
                type='radio'
                id='${emotion}'
                value='${emotion}'
                name='radio'
            >
        </div>
        `
    }
    emotionRadios.innerHTML = string;
}


renderEmotion(catsData)

