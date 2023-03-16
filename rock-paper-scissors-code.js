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
    return { response: `You lose! ${computerSelection} beats ${playerSelection}`, add: 0};
}

function win(playerSelection, computerSelection) {
    return {response: `You win! ${playerSelection} beats ${computerSelection}`, add: 1};
}

function tie(playerSelection, computerSelection) {
    return {response: `It's a tie! ${playerSelection} equally matches ${computerSelection}`, add: 0};
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
    let playerWins = 0;
    for (let i = 0; i < 5; i++) {
        const playerSelection = getUserChoice(prompt());
        const computerSelection = getComputerChoice();
        result = playRound(playerSelection, computerSelection);
        console.log(result.response);
        playerWins += result.add;
    }
    if (playerWins > 2) {
        console.log("You won this game!");
    }
    else {
        console.log("The computer has won..");
    }
}

game();