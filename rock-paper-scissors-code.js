function playRound(playerSelection, computerSelection) {
    if (playerSelection.advantage == computerSelection) {
        return win(playerSelection.userChoice, computerSelection);
    }
    else if (playerSelection.disadvantage == computerSelection) {
        return lose(playerSelection.userChoice, computerSelection);
    }
    else {
        return tie(playerSelection.userChoice, computerSelection)
    }
}

function lose(playerSelection, computerSelection) {
    return { response: `You lose! ${computerSelection} beats ${playerSelection}`, add: 0, cAdd: 1};
}

function win(playerSelection, computerSelection) {
    return {response: `You win! ${playerSelection} beats ${computerSelection}`, add: 1, cAdd: 0};
}

function tie(playerSelection, computerSelection) {
    return {response: `It's a tie! ${playerSelection} equally matches ${computerSelection}`, add: 0, cAdd: 0};
}

function getComputerChoice() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            return "ERROR";
    }
}

function getUserChoice(userChoice) {
    simplifiedUserChoice = userChoice.toLowerCase();
    switch(true) {
        case simplifiedUserChoice == "rock":
            return {userChoice: "Rock", advantage: "Scissors", disadvantage: "Paper"};
        case simplifiedUserChoice == "paper":
            return {userChoice: "Paper", advantage: "Rock", disadvantage: "Scissors"};
        case simplifiedUserChoice == "scissors":
            return {userChoice: "Scissors", advantage: "Paper", disadvantage: "Rock"};
        default:
            return {userChoice: "Error", advantage: "Error", disadvantage: "Error"};
    }
}

let pWins = 0, cWins = 0;

const container = document.querySelector('#container');

// will log the response per round
const action = document.createElement('h2');
container.append(action);

// keeps player score
const playerScore = document.createElement('h3');
playerScore.textContent = "Player Score: " + pWins;
container.appendChild(playerScore);

// keeps computer score
const computerScore = document.createElement('h3');
computerScore.textContent = "Computer Score: " + cWins;
container.appendChild(computerScore);

// will announce the winner per match
const response = document.createElement('h1');

// hold the visual graph data
const playerGraph = document.querySelector('#player');
const computerGraph = document.querySelector('#computer');
const playerGraphText = document.querySelector('#player-text');
const computerGraphText = document.querySelector('#computer-text');

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (container.contains(response)) {
            container.removeChild(response);
            playerGraphText.textContent = "Player";
            computerGraphText.textContent = "Computer";
        }

        result = playRound(getUserChoice(button.id), getComputerChoice());
        
        pWins += result.add;
        cWins += result.cAdd;

        action.textContent = result.response;

        playerScore.textContent = "Player Score: " + pWins;
        computerScore.textContent = "Computer Score: " + cWins;

        playerGraph.style.cssText = `flex: ${pWins} 1 auto;`;
        computerGraph.style.cssText = `flex: ${cWins} 1 auto;`;
        if (pWins == 0 && cWins == 0) {
            playerGraph.style.cssText = `flex: 1 1 auto;`;
            computerGraph.style.cssText = `flex: 1 1 auto;`;
        }

        if (pWins == 5) {
            response.textContent = "You won this match!";
            container.insertBefore(response, action);

            pWins = 0, cWins = 0;
            
            computerGraphText.textContent = "";
            computerGraph.style.cssText = `flex: ${cWins} 1 auto;`;
        } 
        else if (cWins == 5) {
            response.textContent = "The computer has won this match!";
            container.insertBefore(response, action);

            pWins = 0, cWins = 0;

            playerGraphText.textContent = "";
            playerGraph.style.cssText = `flex: ${pWins} 1 auto;`;
        }
    });
});
