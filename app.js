/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Values: Rules
let min = Math.floor((Math.random() * 5) + 2);
    max = Math.floor((Math.random() * 15) + 10);
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const gamePlatform = document.querySelector('#game-platform'),
      submitButton = document.querySelector('#submit-button');
      guessInput = document.querySelector('#guess-input');
      minNum = document.querySelector('.min-number');
      maxNum = document.querySelector('.max-number');
      alertMessage = document.querySelector('.alert-message');

      h1Style = document.querySelector('.h1Style');
      pStyle = document.querySelector('.pStyle');


/*
gamePlatform, submitButton, guessInput, minNum, maxNum, alertMessage
*/

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
submitButton.addEventListener('click', function(){
  let userGuess = parseInt(guessInput.value);

  // Validate
  if(isNaN(userGuess) || userGuess < min || userGuess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  
  // Check if user wins
  if (userGuess === winningNum) {
    // Won The Game
    guessInput.disabled = true; // Disable User Input When Wins
    guessInput.style.borderColor = 'green'; // Change Border Color
    h1Style.innerText = 'WINNER! WINNER! WINNER!';
    h1Style.style.color = 'green';
    setMessage(`Number ${winningNum} is a WINNER!! You get a LAMBO! You get a LAMBO! Everybody get a LAMBO!`, 'green');

    // Play Again????
    submitButton.value = 'Play Again?';
    submitButton.className = 'play-again';

  } else {
    // Wrong Number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game Over Loss
      guessInput.disabled = true; // Disable User Input When Wins
      guessInput.style.borderColor = 'red'; // Change Border Color
      h1Style.innerText = 'GAME OVER';
      h1Style.style.fontFamily = "'Nosifer', cursive";
      h1Style.style.color = 'red';
      setMessage(`Winning Number is ${winningNum}. Sorry you lost.`, 'red');
      submitButton.disabled = true;

      // Play Again????
      submitButton.value = 'Play Again?';
      submitButton.className += 'play-again';
      submitButton.disabled = false;
    } else {
      // Game continues - answer wrong
      guessInput.value = '';
      guessInput.style.borderColor = 'red';

      // Tell user its the wrong Number
      setMessage(`${userGuess} is WRONG!. You have ${guessesLeft} guesses left. Try Again.`, 'red');
    }
  }

});


gamePlatform.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});




// ⬆︎ Set Message for "Please enter a number between ${min} and ${max}"
function setMessage(msg, color){
  alertMessage.style.color = color;
  alertMessage.textContent = msg;
}

// Get Winning Number---------------
function getRandomNum(min, max){
  return (Math.floor(Math.random() * (max-min+1)+min));
}
