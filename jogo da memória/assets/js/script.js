const grid = document.querySelector('.grid')
const timer = document.querySelector('.timer')
const endGameMenu = document.querySelector('.modal-menu')
const finaltime = document.querySelector('#modal-resposta-win > span')

const characters = ['BMO', 'FINN', 'JUJUBA', 'MARCELINE', 'CAROÇO', 'JAKE', 'REI-GELADO', 'SIMON', 'TROMBA', 'FOGOSA']

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

let firstcard = ''
let secondcard = ''

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card')

    if (disabledCards.length === (characters.length * 2)) {
        endGameMenu.style.display = 'block'
        finaltime.innerHTML = ` ${timer.innerHTML} segundos`
        clearInterval(this.loop)
    }
}

const checkCards = () => {
    const firstCharacter = firstcard.getAttribute('data-character')
    const secondCharacter = secondcard.getAttribute('data-character')

    if (firstCharacter === secondCharacter) {
        firstcard.firstChild.classList.add('disabled-card')
        secondcard.firstChild.classList.add('disabled-card')

        firstcard = ''
        secondcard = ''

        checkEndGame()
    } else {

        setTimeout(() => {
            firstcard.classList.remove('reveal-card')
            secondcard.classList.remove('reveal-card')

            firstcard = ''
            secondcard = ''
        }, 500)
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return
    }

    if (firstcard === '') {
        target.parentNode.classList.add('reveal-card')
        firstcard = target.parentNode
    } else if (secondcard === '') {
        target.parentNode.classList.add('reveal-card')
        secondcard = target.parentNode


        checkCards()
    }

}

const createCard = (character) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url(./assets/img/${character}.jpg)`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    return card
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters]
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

    shuffledArray.forEach((character) => {

        const card = createCard(character)
        grid.appendChild(card)
    })
}

const playAgain = () => {
    timer.innerText = '00'
    endGameMenu.classList.remove('show')
    window.location.reload()
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML
        timer.innerHTML = currentTime + 1
    }, 1000)
}


startTimer()
loadGame()
