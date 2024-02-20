const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

const score = document.querySelector('.score-value')
const finalscore = document.querySelector('#modal-resposta-lose > span')
const menu = document.querySelector('.modal-menu')
const buttonPlay = document.querySelector('.btn-play')

const audio = new Audio('../assets/audio.mp3')
const size = 30
let snake = [
    { x: 300, y: 300 },
]

const incrementScore = () => {
    score.innerText = +score.innerText + 1
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / size) * size
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: 'red'
}

let direction, loopId

const drawFood = () => {

    const { x, y, color } = food

    ctx.shadowColor = 'red'
    ctx.shadowBlur = 25
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = 'rgb(182, 182, 182)'
    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = 'white'
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}


const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == 'right') {
        snake.push({ x: head.x + size, y: head.y })

    }

    if (direction == 'left') {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == 'down') {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == 'up') {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = '#aaaf'

    for (let i = 30; i < canvas.width; i += size) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, canvas.width)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
    }

    ctx.stroke()
}

const eat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)
        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
        incrementScore()

    }
}

const colision = () => {
    const head = snake[snake.length - 1]
    const neck = snake.length - 2
    const canvasLimit = canvas.width - size
    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
    const selfCollision = snake.find((position, index) => {
        return index < neck && position.x == head.x && position.y == head.y
    })

    if (wallCollision || selfCollision) {
        gameOver()
    }

}

const gameOver = () => {
    direction = null

    menu.style.display = "flex"
    finalscore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"

    document.onkeydown = keypresed;
}

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)
    moveSnake()
    drawSnake()
    drawGrid()
    drawFood()
    eat()
    colision()

    loopId = setTimeout(() => {
        gameLoop()
    }, 200)
}

gameLoop()

document.addEventListener('keydown', ({ key }) => {
    if (key == 'ArrowRight' && direction != 'left') direction = 'right'
    if (key == 'ArrowLeft' && direction != 'right') direction = 'left'
    if (key == 'ArrowDown' && direction != 'up') direction = 'down'
    if (key == 'ArrowUp' && direction != 'down') direction = 'up'

})

buttonPlay.addEventListener('click', () => {
    score.innerText = '00'
    menu.style.display = 'none'
    canvas.style.filter = 'none'
    window.location.reload()  
})
