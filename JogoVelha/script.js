const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]")
const winningMessageText = document.querySelector("[data-winning-message-text]")
const winningMessage = document.querySelector("[data-winning-message]")
const restartButton = document.querySelector("[data-restart-button]")
let isCircleTurn
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function startGame() {
    isCircleTurn = false

    for (const cell of cellElements) {
        cell.classList.remove("circle")
        cell.classList.remove("x")
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true }); //criando o evento de clicar e aparecer o símbolo apenas uma vez
    }
    
    setBoardHoverClass()
    winningMessage.classList.remove("show-winning-message")
}

function endGame(empate) {
    if(empate) {
        winningMessageText.innerText = 'Empate'
    } else {
        winningMessageText.innerText = isCircleTurn ? "O Venceu!" : "X Venceu"
    }

    winningMessage.classList.add("show-winning-message")
}

function checkForWin(currentPlayer) {
    return winningCombinations.some(combination => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

function checkForEmpate() {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}

// Coloca X ou O na célula
function placeMark(cell, classToAdd) {
    cell.classList.add(classToAdd)
}

function setBoardHoverClass() {
    board.classList.remove("circle")
    board.classList.remove("x")

    if (isCircleTurn) {
        board.classList.add("circle")
    } else {
        board.classList.add("x")
    }
}

function swapTurns() {
    isCircleTurn = !isCircleTurn
    setBoardHoverClass();
}

// Função chamada ao clicar em uma célula
function handleClick(event) {
    //Colocar a marca (X ou O)
    const cell = event.target
    const classToAdd = isCircleTurn ? 'circle' : 'x' //verifica se é a vez do círculo ou do X e define a classe a ser adicionada.

    placeMark(cell, classToAdd)

    //Verificar por vitória
    const isWin = checkForWin(classToAdd)

    //Verificar por empate
    const isDraw = checkForEmpate()

    if(isWin) {
        endGame(false)
    } else if(isDraw) {
        endGame(true)
    } else {
        //Mudar símbolo
        swapTurns()
    }
}

startGame()

restartButton.addEventListener('click', startGame)
