// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 1;
let equationsArray = [];
let playerGuessArray = [];
let bestScoreArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';
let player;

// Scroll
let valueY = 0;

function bestScoresToDom(){
  bestScoreArray.forEach((best,index)=>{
    const bestScoreEl = bestScores[index];
    bestScoreEl.textContent = `${bestScoreArray[index].bestScore}s`;
  })
}

function getSavedBestScore(){
  if(localStorage.getItem('bestScores')){
    bestScoreArray = JSON.parse(localStorage.bestScores);
  } else{
    bestScoreArray = [
      {  questions: 10,  bestScore: finalTimeDisplay },
      {  questions: 25,  bestScore: finalTimeDisplay },
      {  questions: 50,  bestScore: finalTimeDisplay },
      {  questions: 99,  bestScore: finalTimeDisplay }
    ];
    localStorage.setItem('bestScores',JSON.stringify(bestScoreArray));
  }
  bestScoresToDom();
}

// update best score

function updateScore(){
  bestScoreArray.forEach((score,index)=>{
    if(questionAmount==score.questions){
      const savedBestScore = Number(bestScoreArray[index].bestScore);
      if(savedBestScore===0 || savedBestScore>finalTime)  bestScoreArray[index].bestScore = finalTimeDisplay;
    }
  });
  bestScoresToDom();
  localStorage.setItem('bestScores',JSON.stringify(bestScoreArray));
}

function updateFirestore(score){
  createGameDb({
    name: player.name,
    game: "math-sprint-game",
    id: player.id,
    email: player.email,
    score: score,
    question_amount: questionAmount,
    g_date: new Date().toLocaleDateString(),
    g_time: new Date().toLocaleTimeString(),
});
}

function playAgain(){
  gamePage.addEventListener('click',startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  equationsArray = [];
  playerGuessArray = [];
  valueY = 0;
  timePlayed = 0;
}

function showScorePage(){
  gamePage.hidden = true;
  scorePage.hidden = false;
}

// format and display time

function scoresToDom(){
  finalTimeDisplay= finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);
  baseTimeEl.textContent = `Base Time : ${baseTime}s`;
  penaltyTimeEl.textContent = `Penalty : +${penaltyTime}s`;
  finalTimeEl.textContent = `${finalTimeDisplay}s`;
  updateFirestore(finalTimeDisplay);
  updateScore();
  itemContainer.scrollTo({ top:0, behavior:'instant'});
  showScorePage();
}

// stop timer

function checkTime(){
  if(playerGuessArray.length == questionAmount){
    clearInterval(timer);
    equationsArray.forEach((equation,index)=>{
      if (equation.evaluated === playerGuessArray[index]){

      } else{
        penaltyTime+=0.5;
      }
    });
    finalTime = timePlayed + penaltyTime;
    scoresToDom();
  }
}

// add 1/10 s to timeplayed

function addTime(){
  timePlayed+=0.1;
  checkTime();
}

// start timer

function startTimer(){
  timePlayed=0.1;
  penaltyTime=0;
  finalTime=0;
  timer = setInterval(addTime,100);
  gamePage.removeEventListener('click',startTimer);
}

// scroll, store 
function select(guessedTrue){
  valueY+=80;
  itemContainer.scroll(0,valueY);
  return guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false');
}

function showGamePage(){
  gamePage.hidden = false;
  countdownPage.hidden = true;
}

function leftRight(e){
  if(!(gamePage.hidden)){
    timePlayed==0 && startTimer();
    e.keyCode===39 && select(true);
    e.keyCode===37 && select(false);
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = Math.floor(Math.random()*questionAmount +1);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = Math.floor(Math.random()*9+1);
    secondNumber = Math.floor(Math.random()*9+1);
    const equations = [
      `${firstNumber} + ${secondNumber} = ${firstNumber+secondNumber}`,
      `${firstNumber} - ${secondNumber} = ${firstNumber-secondNumber}`,
      `${firstNumber} X ${secondNumber} = ${firstNumber*secondNumber}`,
      `${firstNumber} / ${secondNumber} = ${(firstNumber/secondNumber).toFixed(1)}`];
    equationObject = { value: equations[Math.floor(Math.random()*4)], evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = Math.floor(Math.random()*9+1);
    secondNumber = Math.floor(Math.random()*9+1);
    const equations = [
      `${firstNumber+Math.floor(Math.random()*2)} + ${secondNumber+Math.floor(Math.random()*2 +1)} = ${firstNumber+secondNumber}`,
      `${firstNumber+Math.floor(Math.random()*2 +1)} - ${secondNumber+Math.floor(Math.random()*2)} = ${firstNumber-secondNumber}`,
      `${firstNumber+Math.floor(Math.random()*2)} X ${secondNumber+Math.floor(Math.random()*2 +1)} = ${firstNumber*secondNumber}`,
      `${firstNumber+Math.floor(Math.random()*2 +1)} / ${secondNumber+Math.floor(Math.random()*2)} = ${(firstNumber/secondNumber).toFixed(1)}`];
    equationObject = { value: equations[Math.floor(Math.random()*4)], evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
}

function equationsToDom(){
  equationsArray.forEach((eq)=>{
    const item = document.createElement('div');
    item.classList.add('item')
    const eqText = document.createElement('h1');
    eqText.textContent = eq.value;
    item.appendChild(eqText);
    itemContainer.appendChild(item);
  })
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsToDom();

  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

function countdownStart(){
  countdown.textContent = '3';
  setTimeout(()=>{
    countdown.textContent = '2';
    setTimeout(()=>{
      countdown.textContent = '1';
      setTimeout(()=>{
        countdown.textContent = 'GO!';
      },1000);
    },1000);
  },1000);
}

function showCountDown(){
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart();
  populateGamePage();
  setTimeout(showGamePage,4000);
}

function getRadioValue(){
  let RadioValue;
  radioInputs.forEach((radioInput)=>{
    if(radioInput.checked){
      radioValue = radioInput.value;
    }
  })
  return radioValue;

}

function selectQuestionAmount(e){
  e.preventDefault();
  questionAmount = getRadioValue();
  showCountDown();
}

startForm.addEventListener('click',()=>{
  radioContainers.forEach((radioEl)=>{
    radioEl.classList.remove('selected-label');
    if (radioEl.children[1].checked){
      radioEl.classList.add('selected-label');
    }
  })
})

startForm.addEventListener('submit', selectQuestionAmount);
document.addEventListener('keydown',leftRight);
gamePage.addEventListener('click',startTimer);

getSavedBestScore();
