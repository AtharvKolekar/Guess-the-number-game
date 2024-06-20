let randomNumber = Math.round((Math.random() * 100) + 1);

const form = document.querySelector('form');
const userInput = document.querySelector('#guessField');
const submit = document.querySelector('#subt');
const guessArray = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const output = document.querySelector('.lowOrHi');
const result = document.querySelector('.resultParas');

const p = document.createElement('button');
let playGame = true;
let attempt = 0;

if(playGame){
    submit.addEventListener('click', (e)=>{
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validInput(guess);
    })
}

function validInput(guess){
    if(isNaN(guess) || guess < 1 || guess > 100){
       displayMesg(`Enter a valid number`);
       userInput.value = '';
    }
    else if(attempt < 10){
        attempt++;
        userInput.value = '';
        guessArray.innerHTML += `${guess}, `;
        remaining.innerHTML = `${10 - attempt}`
        checkGuess(guess);
        if(attempt == 10){
            displayMesg(`Attempts are over`);
            endGame();
        }
    }
}

function checkGuess(guess){
    if(guess < randomNumber){
        displayMesg(`${guess} number is too low`)
    }
    else if(guess > randomNumber){
        displayMesg(`${guess} number is too high`)
    }
    else{
        displayMesg(`You guessed it right`);
        endGame();
    }
}

function displayMesg(msg){
    output.innerHTML = `<h3>${msg}</h3>`
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.innerHTML = `<h3 id="newGame">new game</h3>`
    result.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', (e)=>{
        randomNumber = Math.round((Math.random() * 100)+1);
        guessArray.innerHTML = '';
        attempt = 0;
        remaining.innerHTML = 10;
        userInput.removeAttribute('disabled');
        result.removeChild(p);
        output.innerHTML = '';
        playGame = true;
    })
}