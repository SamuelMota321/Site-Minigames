
const palavrasConcretas = [
    "Cachoeira",
    "Bicicleta",
    "Sapatilha",
    "Planalto",
    "Pintura",
    "Canivete",
    "Jardim",
    "Farol",
    "Chapéu",
    "Montanha",
    "Bolsa",
    "Travesseiro",
    "Foguete",
    "Lousa",
    "Bússola",
    "Pente",
    "Cadeira",
    "Cachimbo",
    "Lençol",
    "Borracha",
   "Piano",
    "Girafa",
    "Chocolate",
    "Computador",
    "Abacaxi",
    "Xícara",
    "Tênis",
    "Violão",
    "Anel",
    "Pintor",
    "Elefante",
    "Sushi",
    "Câmera",
    "Fogueira",
    "Avião",
    "Diário",
    "Óculos",
    "Cachorro",
    "Abajur",
    "Tesoura",
    "Garfo",
    "Bateria",
    "Sombra",
    "Bola",
    "Abajur",
    "Relógio",
    "Guitarra",
    "Vaso",
    "Zebra",
    "Quadro",
    "Espelho",
    "Piscina",
    "Melancia",
    "Coruja",
    "Helicóptero",
    "Janela",
    "Queijo",
    "Bolsa",
    "Tigre",
    "Deserto",
    "Tartaruga",
    "Xadrez",
    "Velocidade",
    "Trampolim",
    "Jaleco",
    "Leão",
    "Cachecol",
    "Cacto",
    "Cadeado",
    "Gravata"

];


const btnStart = document.getElementById("btn-start");
const modalLose = document.getElementById("modal-lose");
const modalWin = document.getElementById("modal-win");

function palavraRandom() {
    const numeroRandom = Math.floor(Math.random() * palavrasConcretas.length);

    let palavra = palavrasConcretas[numeroRandom]

    return palavra.toUpperCase();
}

let palavra = palavraRandom();

function gerarGame(palavra) {

    const btnStart = document.getElementById("btn-start");
    const container = document.getElementById('palavra-container');
    const teclado = document.getElementById("teclado")

    for (i = 0; i < palavra.length; i++) {

        let letra = palavra.charAt(i);

        let tracejado = document.createElement("div");
        tracejado.className = `tracejado ${letra}`;


        container.appendChild(tracejado);

    }
    btnStart.style.display = 'none';

    teclado.style.display = 'grid';
    console.log(palavra)
}


function adicionarAcentos(letraNormal) {
    var mapaAcentos = {
        'A': 'Á',
        'E': 'É',
        'I': 'Í',
        'O': 'Ó',
        'U': 'Ú',
        'C': 'Ç'
        // Adicione mais letras e seus acentos conforme necessário
    };

    return letraNormal.replace(/[AEIOUC]/g, function (letra) {
        return mapaAcentos[letra] || letra;
    });
}

function adicionarLetra(letra) {

    const botoes = document.querySelectorAll('button');

    botoes.forEach(botao => {
        if (botao.textContent.trim() === letra) {
            botao.disabled = true;
        }
    });

    let erro = 0;



    for (i = 0; i < palavra.length; i++) {

        if (letra == palavra.charAt(i)) {
            elementoTracejado = document.querySelectorAll(`.tracejado.${letra}`);


            elementoTracejado.forEach(tracejado => {
                tracejado.innerHTML = letra;
                tracejado.classList.add('acerto');
                tracejado.classList.remove('tracejado');
            });


        } else if (adicionarAcentos(letra) == palavra.charAt(i)) {
            elementoTracejado = document.querySelectorAll(`.tracejado.${adicionarAcentos(letra)}`);


            elementoTracejado.forEach(tracejado => {
                tracejado.innerHTML = adicionarAcentos(letra);
                tracejado.classList.add('acerto');
                tracejado.classList.remove('tracejado');
            });

        } else {
            erro++
        }

    }

    vitoriaManager(erro)
}



btnStart.addEventListener('click', () => {

    gerarGame(palavra);
    imagemDraw();

})

let contador = 0;

function vitoriaManager(erro) {


    if (erro >= palavra.length) {

        contador++

    }

    switch (contador) {
        case 1: cabecaDraw();

            break

        case 2: corpoDraw();

            break

        case 3: bracoEsquerdoDraw();

            break

        case 4: bracoDireitoDraw();

            break

        case 5: pernaEsquerdaDraw();

            break

        case 6: pernaDireitaDraw();

            break
    }

    if (contador == 6) {
        modalLose.style.display = "block";

        const resposta = document.getElementById("modal-resposta-lose");

        resposta.innerHTML = "A palavra era: " + palavra;
    }

    const container = document.getElementById('palavra-container');

    const filhosComClasse = container.querySelectorAll('.tracejado');

    if (filhosComClasse.length > 0) {

    }
    else {
        modalWin.style.display = "block";

        const resposta = document.getElementById("modal-resposta-win");

        resposta.innerHTML = "A palavra era: " + palavra;
    }
}


//Funções de desenho abaixo


let tela = document.getElementById("tela");

let context = tela.getContext("2d");



function imagemDraw(){

    let img = new Image();
    img.src = "../img/forca.png"

    img.onload = function (){
        context.drawImage(this, 30, 75, 600, 500)
    }



}

function cabecaDraw() {


    let x = 495;
    let y = 232;
    let raio = 50;
    let inicio = 0;

    let fim = 2 * Math.PI;

    context.beginPath();

    context.strokeStyle = "white";

    context.arc(x, y, raio, inicio, fim);

    context.stroke();

    context.closePath();

}

function corpoDraw() {

    context.beginPath(); //Corpo

    context.moveTo(495, 281);

    context.lineTo(495, 450);

    context.strokeStyle = "white";

    context.stroke();

    context.closePath();
}

function bracoEsquerdoDraw() {


    context.beginPath(); //Braços

    context.moveTo(550, 370);

    context.lineTo(495, 300);

    context.strokeStyle = "white";

    context.stroke();

    context.closePath();

}

function bracoDireitoDraw() {


    context.beginPath(); //Braços

    context.moveTo(495, 300);

    context.lineTo(440, 370);

    context.strokeStyle = "white";

    context.stroke();

    context.closePath();

}

function pernaEsquerdaDraw() {

    context.beginPath(); //Pernas

    context.moveTo(495, 450);

    context.lineTo(550, 500);

    context.strokeStyle = "white";

    context.stroke();

    context.closePath();

}


function pernaDireitaDraw() {

    context.beginPath(); //Pernas

    context.moveTo(495, 450);

    context.lineTo(440, 500);

    context.strokeStyle = "white";

    context.stroke();

    context.closePath();

}