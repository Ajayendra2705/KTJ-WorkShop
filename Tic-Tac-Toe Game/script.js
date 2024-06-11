let player1Name = prompt("Enter player 1's name:");
let player2Name = prompt("Enter player 2's name:");

const board = document.getElementById('board')
const squares = document.getElementsByClassName('square')
const players = [player1Name, player2Name]
let currentPlayer = players[0]
let currentSymbol = 'X'
let score = { [player1Name]: 0, [player2Name]: 0 }
let gameOver = false

const restartButton = document.createElement('button')
restartButton.textContent = 'Restart Game'
restartButton.style.display = "block";
restartButton.style.margin = "0 auto";
restartButton.style.marginTop = '20px';
restartButton.style.marginBottom = '10px';
next_area.after(restartButton)

const scoreboard = document.createElement('div')
scoreboard.textContent = `Score: ${player1Name} - ${score[player1Name]} | ${player2Name} - ${score[player2Name]}`
scoreboard.style.marginTop = '10px'
scoreboard.style.textAlign='center'
scoreboard.style.marginBottom = '10px'

next_area.after(scoreboard)

const endMessage = document.createElement('h2')
endMessage.textContent = `${currentPlayer}'s turn!`
endMessage.style.marginTop = '15px'
endMessage.style.textAlign='center'
next_area.after(endMessage)

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkWin(currentSymbol) {
    for(let i = 0; i < winning_combinations.length; i++){
        const [a, b, c] = winning_combinations[i]
        if(squares[a].textContent === currentSymbol && squares[b].textContent === currentSymbol && squares[c].textContent === currentSymbol){
            return true
        }
    }
    return false
}

function checkTie(){
    for(let i = 0; i < squares.length; i++) {
        if(squares[i].textContent === '') {
            return false;
        }
    }
    return true
}

function restartGame() {
    gameOver = false
    for(let i = 0; i < squares.length; i++) {
        squares[i].textContent = ""
    }
    endMessage.textContent=`${players[1 - (players.indexOf(currentPlayer))]}'s turn!`
    currentPlayer = players[1 - (players.indexOf(currentPlayer))]
    currentSymbol = (currentPlayer === players[0]) ? 'X' : 'O'
    scoreboard.textContent = `Score: ${player1Name} - ${score[player1Name]} | ${player2Name} - ${score[player2Name]}`
}

restartButton.addEventListener('click', restartGame)

for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => {
        if(gameOver) return
        if(squares[i].textContent!== ''){
            return
        }
        squares[i].textContent = currentSymbol
        squares[i].style.justifyContent = 'center'
        squares[i].style.alignItems = 'center'
        squares[i].style.fontSize = '36px'
        if(checkWin(currentSymbol)) {
            endMessage.textContent=`Game over! ${currentPlayer} wins!`
            score[currentPlayer]++;
            scoreboard.textContent = `Score: ${player1Name} - ${score[player1Name]} | ${player2Name} - ${score[player2Name]}`
            gameOver = true
            return
        }
        if(checkTie()) {
            endMessage.textContent= `Game is tied!`
            gameOver = true
            return
        }
        currentSymbol = (currentSymbol === 'X')? 'O' : 'X'
        currentPlayer = (currentPlayer === players[0])? players[1] : players[0]
        endMessage.textContent= `${currentPlayer}'s turn!`
    })
    
    squares[i].addEventListener('mouseover', () => {
        if(gameOver) return
        squares[i].style.backgroundColor = 'yellow'
    })
    
    squares[i].addEventListener('mouseout', () => {
        if(gameOver) return
        squares[i].style.backgroundColor = '#fff'
    })
}