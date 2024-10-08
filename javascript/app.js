import { dragStart, dragOver, dragEnd, drop } from "./drag-drop.js"

class Player {
    constructor(color, turn){

    this.color = color
    this.pawnsEaten = 0
    this.turn = turn
    }
}

export const player1 = new Player("white", true)
export const player2 = new Player("black", false)

document.addEventListener("DOMContentLoaded", () => {

    const chessboard = document.querySelector('.chessboard')
    chessboard.innerHTML = squaresGenerator() // Funzione che genera le caselle della scacchiera
    const squaresBlack = document.querySelectorAll('.square.black')

    squaresBlack.forEach((square, i) => {

        pawnsGenerator(square, square.id.split('-')[1], i) // Funzione che genera le pedine
        square.addEventListener("dragover", dragOver)
        square.addEventListener("drop", drop)

    })

    let allPawns = document.querySelectorAll('img.pawn')

    allPawns.forEach(pawn => {
        pawn.addEventListener("dragstart", dragStart)
        pawn.addEventListener("dragover", dragOver)
        pawn.addEventListener("dragend", dragEnd)

        if(pawn.classList[1] === player1.color) {
            pawn.setAttribute('draggable', player1.turn)
        }
        else {
            pawn.setAttribute('draggable', player2.turn)
        }
    })

    // console.log(player1, player2)
})

function squaresGenerator() {

    let squares = ""
    let counter = 1

    for (let row = 1; row < 9; row++) {
        for (let square = 1; square < 9; square++) {
            // Nel caso in cui il contatore è pari, la casella avrà come seconda classe "black", altrimenti "white"
            squares += `<div id="N-${row}-${square}" class="square ${counter % 2 == 0 ? "black" : "white"}"></div>`;
            counter++
        }
        counter++
    }

    return squares

}

function pawnsGenerator(square, squareID, i) {

    if (squareID <= 3) {
        square.innerHTML = `<img src="./image/white.webp" alt="pawn white" class="pawn white" id="PW-${i + 1}">`
    }

    if (squareID >= 6) {
        square.innerHTML = `<img src="./image/black.webp" alt="pawn black" class="pawn black" id="PB-${i + 1}">`
    }

}