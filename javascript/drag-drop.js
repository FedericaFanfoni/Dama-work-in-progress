let pawnMoved;
let nextSquares;
let pawnEatenLeft;
let pawnEatenLeft2;
let pawnEatenRight;
let pawnEatenRight2;

export function dragStart(e) {

    pawnMoved = e.target
    nextSquares = movedPawn(pawnMoved, pawnMoved.parentElement)
    console.log(nextSquares)

    if (!pawnMoved.classList[2]) {
        pawnEatenLeft = pawnEaten(nextSquares.filter((_, i) => i % 2 === 0), pawnMoved) // MOSSA VERSO SINISTRA
        console.log(pawnEatenLeft)
        pawnEatenRight = pawnEaten(nextSquares.filter((_, i) => i % 2 === 1), pawnMoved) // MOSSA VERSO DESTRA
        console.log(pawnEatenRight)
    }
    else {
        pawnEatenLeft = pawnEaten(nextSquares.filter((_, i) => i % 2 === 0), pawnMoved)
        pawnEatenLeft2 = pawnEaten(nextSquares.filter((_, i) => i % 2 === 0), pawnMoved)

        pawnEatenRight = pawnEaten(nextSquares.filter((_, i) => i % 2 === 1), pawnMoved)
        pawnEatenRight2 = pawnEaten(nextSquares.filter((_, i) => i % 2 === 1), pawnMoved)
    }
}

export function dragOver(e) {
    e.preventDefault();
}

export function dragEnd(e) {
    e.preventDefault()

    document.querySelectorAll(".square.black").forEach(square => {

        if (square.classList[2] === "free" || square.classList[2] === "occupied") {
            square.classList.remove("free")
            square.classList.remove("occupied")
        }
    });
}

export function drop(e) {
    e.preventDefault();

    if (e.target.classList[2] === "free") {

        // if (!pawnMoved.classList[2] && pawnEatenLeft != undefined && pawnEatenLeft.classList[2] === "super" && e.target === nextSquares[1]) {
        //     console.log("Non puoi mangiare una super pedina")
        //     return
        // }

        // if (!pawnMoved.classList[2] && pawnEatenRight != undefined && pawnEatenRight.classList[2] === "super" && e.target === nextSquares[3]) {
        //     console.log("Non puoi mangiare una super pedina")
        //     return
        // }

        eat(pawnEatenLeft, nextSquares[2], nextSquares[6], e.target)
        eat(pawnEatenRight, nextSquares[3], nextSquares[7], e.target)
        // eat(pawnEatenLeft2, pawnMoved, nextSquares[5], e.target)
        // eat(pawnEatenRight2, pawnMoved, nextSquares[7], e.target)

        e.target.appendChild(pawnMoved);
        change(pawnMoved)
        superPawn(e.target.id, pawnMoved)

    }

}

function superPawn(targetID, pawnMoved) {

    if (!pawnMoved.classList[2] && (targetID.split("-")[1] === "1" || targetID.split("-")[1] === "8")) {
        pawnMoved.classList.add("super")
        pawnMoved.style.border = "solid 3px blue"
        console.log(pawnMoved)
    }
}

function eat(pawnEaten, square, square2, target) {

    if (pawnEaten !== undefined && target === square) {
        pawnEaten[0].remove()
        // console.log(pawnEaten, square)
    }
    else if (target === square2) {
        pawnEaten[0].remove()
        pawnEaten[1].remove()
        // console.log(pawnEaten, square)
    }
}

function movedPawn(pawn, pawnSquare) {
    return findSquares(pawn, pawnSquare)
}

function pawnEaten(square, target) {

    let pawnToEat = []

    console.log(square, target)

    if (square[0] && square[0].firstElementChild === null) {
        square[0].classList.add('free')
        return
    }

    if (square[0] && square[0].firstElementChild) {
        square[0].classList.add('occupied')

        if (square[1] && square[1].firstElementChild === null && square[0].firstElementChild.classList[1] !== target.classList[1]) {
            square[1].classList.add('free')
            pawnToEat.push(square[0].firstElementChild)

            if (square[2] && square[2].firstElementChild) {
                square[2].classList.add('occupied')

                if (square[3] && square[3].firstElementChild === null && square[2].firstElementChild.classList[1] !== target.classList[1]) {
                    square[3].classList.add('free')
                    pawnToEat.push(square[2].firstElementChild)
                }
            }
        }
        console.log(pawnToEat)
        return pawnToEat
    }

    // if(target.classList[2])
}

function findSquares(pawn, pawnSquare) {

    let pawnCoordinates;
    let squares = []

    if (pawn.classList[1] === "white") { // PEDINA BIANCA

        if (!pawn.classList[2]) {

            for (let i = 1; i <= 6; i++) {
                pawnCoordinates = assembleID(parseInt(pawnSquare.id.split("-")[1]) + i, parseInt(pawnSquare.id.split("-")[2]) - i)
                squares.push(document.querySelector(`#${pawnCoordinates}`))
                pawnCoordinates = assembleID(parseInt(pawnSquare.id.split("-")[1]) + i, parseInt(pawnSquare.id.split("-")[2]) + i)
                squares.push(document.querySelector(`#${pawnCoordinates}`))
            }

            return squares

        }

        // if (pawn.classList[2]) {

        //     for (let i = 1; i <= 6; i++) {
        //         pawnCoordinates = assembleID(parseInt(pawnSquare.id.split("-")[1]) + i, parseInt(pawnSquare.id.split("-")[2]) - i)
        //         squares.push(document.querySelector(`#${pawnCoordinates}`))

        //         pawnCoordinates = assembleID(parseInt(pawnSquare.id.split("-")[1]) + i, parseInt(pawnSquare.id.split("-")[2]) + i)
        //         squares.push(document.querySelector(`#${pawnCoordinates}`))

        //         pawnCoordinates = assembleID(parseInt(pawnSquare.id.split("-")[1]) - i, parseInt(pawnSquare.id.split("-")[2]) - i)
        //         squares.push(document.querySelector(`#${pawnCoordinates}`))

        //         pawnCoordinates = assembleID(parseInt(pawnSquare.id.split("-")[1]) - i, parseInt(pawnSquare.id.split("-")[2]) + i)
        //         squares.push(document.querySelector(`#${pawnCoordinates}`))
        //     }

        //     return squares
        // }

        // console.log(squares)


    } else { // PEDINA NERA


        for (let i = 1; i <= 6; i++) {
            pawnCoordinates = assembleID(parseInt(pawnSquare.id.split("-")[1]) - i, parseInt(pawnSquare.id.split("-")[2]) - i)
            squares.push(document.querySelector(`#${pawnCoordinates}`))
            pawnCoordinates = assembleID(parseInt(pawnSquare.id.split("-")[1]) - i, parseInt(pawnSquare.id.split("-")[2]) + i)
            squares.push(document.querySelector(`#${pawnCoordinates}`))
        }

        return squares
    }
}

function assembleID(Y, X) {
    return `N-${Y}-${X}`
}

function change(pawnMoved) {

    document.querySelectorAll('img.pawn').forEach(pawn => {

        if (pawn.classList[1] === pawnMoved.classList[1]) {
            pawn.setAttribute('draggable', false)
        }
        else {
            pawn.setAttribute('draggable', true)
        }
    })
}
