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

function game() {
    let playerWins = 0, computerWins = 0;
    while(playerWins < 5 || computerWins < 5) {
        const computerSelection = getComputerChoice();
        result = playRound(playerSelection, computerSelection);
        console.log(result.response);
        playerWins += result.add;
        computerWins += result.cAdd;
    }
    if (playerWins > 2) {
        console.log("You won this game!");
    }
    else {
        console.log("The computer has won..");
    }
}

let pWins = 0, cWins = 0;

const container = document.querySelector('#container');

const playerScore = document.createElement('h3');
playerScore.textContent = "Player Score: " + pWins;
container.appendChild(playerScore);

const computerScore = document.createElement('h3');
computerScore.textContent = "Computer Score: " + cWins;
container.appendChild(computerScore);

const response = document.createElement('h1');
container.appendChild(response);

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (container.contains(response)) {
            container.removeChild(response);
        }

        result = playRound(getUserChoice(button.id), getComputerChoice());
        console.log(result.response);
        pWins += result.add;
        cWins += result.cAdd;

        if (pWins == 5) {
            response.textContent = "You won this match!";
            container.insertBefore(response, playerScore);
            pWins = 0, cWins = 0;
        } 
        else if (cWins == 5) {
            response.textContent = "The computer has won this match!";
            pWins = 0, cWins = 0;
        }
        else {
            container.removeChild(playerScore);
            container.removeChild(computerScore);
            playerScore.textContent = "Player Score: " + pWins;
            computerScore.textContent = "Computer Score: " + cWins;
            container.appendChild(playerScore);
            container.appendChild(computerScore);
        }
    });
});
