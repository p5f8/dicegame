/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// D:\bittorrent\[FreeTutorials.Us] Udemy - the-complete-javascript-course\04 JavaScript in the Browser_ DOM Manipulation and Events
// 044 Finishing Touches_ State Variables.mp4

var scores, roundScore, activePlayer, gamePlaying;
var lastWinner = -1;
var lastDice = -1;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying) {
        // 1. random number
        let dice0 = playTheDice();
        let dice1 = playTheDice();
    
        // 2. display the result
        let diceDOM = document.querySelector('#dice0')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice0 + '.png';

        diceDOM = document.querySelector('#dice1')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice1 + '.png';
    
        // 3. update the round score if the number was not 1
        if(dice0 !== 1 || dice1 !== 1) {
            roundScore += dice0 + dice1;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }

});

function playTheDice() {
    return Math.floor(Math.random() * 6) + 1;
}


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        scores[activePlayer] += roundScore;
    
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var finalScore = document.getElementById('final-score').value;

        // Undefined, 0, null or "" are COERCED to false == if(!finalScore)
        // Anything else is COERCED to true == if(finalScore)
        if(!finalScore) {
            var finalScore = 20
        }

        if(scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
            document.querySelector('.dice0').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            lastWinner = activePlayer;
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice0').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame() {
    scores = [0, 0];
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    if (lastWinner === 0) {  
        activePlayer = 1; // 0=Player1 / 1=Player2
        document.querySelector('.player-1-panel').classList.add('active');
    } else if (lastWinner === 1 || lastWinner === -1) {
        activePlayer = 0; // 0=Player1 / 1=Player2
        document.querySelector('.player-0-panel').classList.add('active');
    }

    document.querySelector('#dice0').style.display = 'none';
    document.querySelector('#dice1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//var x = document.querySelector('#score-1').textContent;
//console.log(x);

