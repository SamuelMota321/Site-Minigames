document.addEventListener("DOMContentLoaded", function () {
    const mesa = document.getElementById("mesa");
    let pecaSelecionada = null;
    let jogadorAtual = "red";
    let infoTexto = document.getElementById("h1-info");
    let infoTexto2 = document.getElementById("h1-info-2");

    infoTexto.innerHTML = "Agora é a vez das peças: Brancas";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const casa = document.createElement("div");
            casa.className = "casa";
            if ((row + col) % 2 === 0) {
                casa.classList.add("black");
            }
            casa.dataset.row = row;
            casa.dataset.col = col;
            mesa.appendChild(casa);

            if ((row < 3 || row > 4) && casa.classList.contains("black")) {
                const peca = document.createElement("div");
                peca.className = "peca";
                peca.classList.add(row < 3 ? "red-peca" : "black-peca");
                casa.appendChild(peca);


                peca.addEventListener("click", function () {
                    pecaSelecionada = peca;
                    pecaSelecionada.parentElement.style.backgroundColor = "lightgreen"
                    const pecas = document.querySelectorAll('.peca');
                    pecas.forEach(peca => {
                        if (peca != pecaSelecionada) {
                            peca.parentElement.style.backgroundColor = "";
                        }
                    })
                });
            }
        }
    }




    const casas = document.querySelectorAll(".casa");

    casas.forEach(casa => {
        casa.addEventListener("click", function () {
            infoTexto2.innerHTML = "";
            if (validarMovimento(casa)) {
                moverPeca(casa);
                casas.forEach(casa => {
                    casa.style.backgroundColor = "";
                })

            }
        });

    });




    function validarMovimento(casaAlvo, capturaSequencia) {
        const casaSelecionada = pecaSelecionada.parentElement;
        const casaSelecionadaLinha = parseInt(casaSelecionada.dataset.row);
        const casaSelecionadaColuna = parseInt(casaSelecionada.dataset.col);
        const casaAlvoLinha = parseInt(casaAlvo.dataset.row);
        const casaAlvoColuna = parseInt(casaAlvo.dataset.col);

        const pecaHierarquia = pecaSelecionada.classList.item(2);

        const rowDiff = casaAlvoLinha - casaSelecionadaLinha;
        const colDiff = Math.abs(casaAlvoColuna - casaSelecionadaColuna);

        // Verificar a cor da peça selecionada
        const pecaSelecionadaCor = pecaSelecionada.classList.contains("red-peca") ? "red" : "black";

        const corInimiga = pecaSelecionadaCor === "red" ? "black" : "red";


        // Determinar a direção permitida para o movimento com base na cor da peça

        const direcaoPermitida = pecaSelecionadaCor === "red" ? 1 : -1;
        let direcaoPermitidaContrario = null;

        if (pecaHierarquia != null) {
            direcaoPermitidaContrario = pecaSelecionadaCor === "red" ? -1 : 1;
        }


        if (capturaDisponivel(jogadorAtual, pecaHierarquia) || capturaSequencia === true) {
            infoTexto2.innerHTML = "Captura obrigatória!"
            if ((rowDiff === direcaoPermitida * 2 || rowDiff === direcaoPermitidaContrario * 2) && colDiff === 2) {
                const casaMeioLinha = (casaSelecionadaLinha + casaAlvoLinha) / 2;
                const casaMeioColuna = (casaSelecionadaColuna + casaAlvoColuna) / 2;
                const casaMeio = document.querySelector(`.casa[data-row="${casaMeioLinha}"][data-col="${casaMeioColuna}"]`);
                const casaMeioPeca = casaMeio.children[0];
                capturaSequencia = false;
                return casaMeio.children.length > 0 && casaAlvo.children.length === 0 && casaMeioPeca.classList.contains(`${corInimiga}-peca`)

            }

        } else {
            if ((rowDiff === direcaoPermitida || rowDiff === direcaoPermitidaContrario) && colDiff === 1) {
                return casaAlvo.children.length === 0;
            }
            return false;
        }
    }
    function capturaDisponivel(corJogador) {

        const pecas = document.querySelectorAll(`.${corJogador}-peca`);
        for (const peca of pecas) {

            const casa = peca.parentElement;
            const pecaValor = peca.classList.item(2);
            const row = parseInt(casa.dataset.row);
            const col = parseInt(casa.dataset.col);
            const direcaoFrente = corJogador === "red" ? 1 : -1; // Direção em que as peças se movem
            const pecaCorOponente = corJogador === "red" ? "black" : "red";

            const diagonalFrenteEsquerda = { linha: row + direcaoFrente, coluna: col - 1 };
            const diagonalFrenteDireita = { linha: row + direcaoFrente, coluna: col + 1 };


            const celulaPecaEsquerda = document.querySelector(`.casa[data-row="${diagonalFrenteEsquerda.linha}"][data-col="${diagonalFrenteEsquerda.coluna}"]`);
            const celulaPecaDireita = document.querySelector(`.casa[data-row="${diagonalFrenteDireita.linha}"][data-col="${diagonalFrenteDireita.coluna}"]`);

            let diagonalTrasEsquerda = null;
            let diagonalTrasDireita = null;

            let direcaoContraria = 0;

            if (pecaValor != null) {
                console.log("chegou aqui")
                direcaoContraria = corJogador === "red" ? -1 : 1;
                diagonalTrasEsquerda = { linha: row + direcaoContraria, coluna: col - 1 }
                diagonalTrasDireita = { linha: row + direcaoContraria, coluna: col + 1 }
                const celulaPecaTrasEsquerda = document.querySelector(`.casa[data-row="${diagonalTrasEsquerda.linha}"][data-col="${diagonalTrasEsquerda.coluna}"]`);
                const celulaPecaTrasDireita = document.querySelector(`.casa[data-row="${diagonalTrasDireita.linha}"][data-col="${diagonalTrasDireita.coluna}"]`);
                let pecaEsquerdaTras = null, pecaDireitaTras = null;

                if (celulaPecaTrasEsquerda) {
                    pecaEsquerdaTras = celulaPecaTrasEsquerda.children[0];
                }

                if (celulaPecaTrasDireita) {
                    pecaDireitaTras = celulaPecaTrasDireita.children[0];

                }
                const celulaAtrasEsquerdaAtras = document.querySelector(`.casa[data-row="${diagonalTrasEsquerda.linha + direcaoContraria}"][data-col="${diagonalTrasEsquerda.coluna - 1}"]`);
                const celulaAtrasDireitaAtras = document.querySelector(`.casa[data-row="${diagonalTrasDireita.linha + direcaoContraria}"][data-col="${diagonalTrasDireita.coluna + 1}"]`);

                if (pecaEsquerdaTras) {
                    if (pecaEsquerdaTras.classList.contains(`${pecaCorOponente}-peca`)) {


                        if (celulaAtrasEsquerdaAtras && celulaAtrasEsquerdaAtras.hasChildNodes() === false) {
                            return true;
                        }
                    }
                } else if (pecaDireitaTras) {
                    if (pecaDireitaTras.classList.contains(`${pecaCorOponente}-peca`)) {


                        if (celulaAtrasDireitaAtras && celulaAtrasDireitaAtras.hasChildNodes() === false) {


                            return true;
                        }
                    }
                }
            }



            let pecaEsquerda = null, pecaDireita = null;

            if (celulaPecaEsquerda) {
                pecaEsquerda = celulaPecaEsquerda.children[0];
            }

            if (celulaPecaDireita) {
                pecaDireita = celulaPecaDireita.children[0];

            }



            const celulaAtrasEsquerda = document.querySelector(`.casa[data-row="${diagonalFrenteEsquerda.linha + direcaoFrente}"][data-col="${diagonalFrenteEsquerda.coluna - 1}"]`);
            const celulaAtrasDireita = document.querySelector(`.casa[data-row="${diagonalFrenteDireita.linha + direcaoFrente}"][data-col="${diagonalFrenteDireita.coluna + 1}"]`);
            if (pecaEsquerda) {
                if (pecaEsquerda.classList.contains(`${pecaCorOponente}-peca`)) {


                    if (celulaAtrasEsquerda && celulaAtrasEsquerda.hasChildNodes() === false) {
                        return true;
                    }
                }
            } else if (pecaDireita) {
                if (pecaDireita.classList.contains(`${pecaCorOponente}-peca`)) {


                    if (celulaAtrasDireita && celulaAtrasDireita.hasChildNodes() === false) {


                        return true;
                    }
                }
            }

        }
        return false

    }


    function moverPeca(casaAlvo) {
        if (pecaSelecionada.classList.contains(`${jogadorAtual}-peca`)) {


            const casaSelecionada = pecaSelecionada.parentElement;
            casaAlvo.appendChild(pecaSelecionada);
            if (Math.abs(parseInt(casaAlvo.dataset.row) - parseInt(casaSelecionada.dataset.row)) === 2) {
                const casaMeioLinha = (parseInt(casaSelecionada.dataset.row) + parseInt(casaAlvo.dataset.row)) / 2;
                const casaMeioColuna = (parseInt(casaSelecionada.dataset.col) + parseInt(casaAlvo.dataset.col)) / 2;
                const casaMeio = document.querySelector(`.casa[data-row="${casaMeioLinha}"][data-col="${casaMeioColuna}"]`);
                casaMeio.removeChild(casaMeio.children[0])

                if (capturaDisponivelSequencia(pecaSelecionada, jogadorAtual)) {
                    const capturaSequencia = true
                    moverPeca(casaAlvo, capturaSequencia)
                    jogadorAtual === "red" ? "red" : "black"
                }

            }
            if (fimDoTabuleiro(casaAlvo, jogadorAtual)) {
                pecaSelecionada.classList.add("dama-peca"); // Adiciona a classe "king-piece" para indicar que a peça agora é uma "dama" ou "rei"
                infoTexto2.innerHTML = "Essa peça virou dama";

            }
            jogadorAtual = jogadorAtual === "red" ? "black" : "red";
            if (jogadorAtual === "red") {

                infoTexto.innerHTML = "Agora é a vez das peças: Brancas";

            } else {

                infoTexto.innerHTML = "Agora é a vez das peças: Pretas";

            }
            infoTexto2.innerHTML = "";
            gameOver();
        }


    }



    function capturaDisponivelSequencia(pecaAtacante, corJogador) {

        const casa = pecaAtacante.parentElement;
        const pecaAtacanteValor = pecaAtacante.classList.item(2);
        const row = parseInt(casa.dataset.row);
        const col = parseInt(casa.dataset.col);
        const direcaoFrente = corJogador === "red" ? 1 : -1; // Direção em que as peças se movem
        const pecaCorOponente = corJogador === "red" ? "black" : "red";

        const diagonalFrenteEsquerda = { linha: row + direcaoFrente, coluna: col - 1 };
        const diagonalFrenteDireita = { linha: row + direcaoFrente, coluna: col + 1 };

        const celulaPecaEsquerda = document.querySelector(`.casa[data-row="${diagonalFrenteEsquerda.linha}"][data-col="${diagonalFrenteEsquerda.coluna}"]`);
        const celulaPecaDireita = document.querySelector(`.casa[data-row="${diagonalFrenteDireita.linha}"][data-col="${diagonalFrenteDireita.coluna}"]`);

        let direcaoContraria = 0;

        let diagonalTrasEsquerda = null;
        let diagonalTrasDireita = null;


        if (pecaAtacanteValor != null) {
            direcaoContraria = corJogador === "red" ? -1 : 1;
            diagonalTrasEsquerda = { linha: row + direcaoContraria, coluna: col - 1 }
            diagonalTrasDireita = { linha: row + direcaoContraria, coluna: col + 1 }
            const celulaPecaTrasEsquerda = document.querySelector(`.casa[data-row="${diagonalTrasEsquerda.linha}"][data-col="${diagonalTrasEsquerda.coluna}"]`);
            const celulaPecaTrasDireita = document.querySelector(`.casa[data-row="${diagonalTrasDireita.linha}"][data-col="${diagonalTrasDireita.coluna}"]`);
            let pecaEsquerdaTras = null, pecaDireitaTras = null;

            if (celulaPecaTrasEsquerda) {
                pecaEsquerdaTras = celulaPecaTrasEsquerda.children[0];
            }

            if (celulaPecaTrasDireita) {
                pecaDireitaTras = celulaPecaTrasDireita.children[0];

            }
            const celulaAtrasEsquerdaAtras = document.querySelector(`.casa[data-row="${diagonalTrasEsquerda.linha + direcaoContraria}"][data-col="${diagonalTrasEsquerda.coluna - 1}"]`);
            const celulaAtrasDireitaAtras = document.querySelector(`.casa[data-row="${diagonalTrasDireita.linha + direcaoContraria}"][data-col="${diagonalTrasDireita.coluna + 1}"]`);

            if (pecaEsquerdaTras) {
                if (pecaEsquerdaTras.classList.contains(`${pecaCorOponente}-peca`)) {


                    if (celulaAtrasEsquerdaAtras && celulaAtrasEsquerdaAtras.hasChildNodes() === false) {
                        return true;
                    }
                }
            } else if (pecaDireitaTras) {
                if (pecaDireitaTras.classList.contains(`${pecaCorOponente}-peca`)) {


                    if (celulaAtrasDireitaAtras && celulaAtrasDireitaAtras.hasChildNodes() === false) {


                        return true;
                    }
                }
            }
        }

        let pecaEsquerda = null, pecaDireita = null;

        if (celulaPecaEsquerda) {
            pecaEsquerda = celulaPecaEsquerda.children[0];
        }

        if (celulaPecaDireita) {
            pecaDireita = celulaPecaDireita.children[0];

        }



        const celulaAtrasEsquerda = document.querySelector(`.casa[data-row="${diagonalFrenteEsquerda.linha + direcaoFrente}"][data-col="${diagonalFrenteEsquerda.coluna - 1}"]`);
        const celulaAtrasDireita = document.querySelector(`.casa[data-row="${diagonalFrenteDireita.linha + direcaoFrente}"][data-col="${diagonalFrenteDireita.coluna + 1}"]`);
        if (pecaEsquerda) {
            if (pecaEsquerda.classList.contains(`${pecaCorOponente}-peca`)) {


                if (celulaAtrasEsquerda && celulaAtrasEsquerda.hasChildNodes() === false) {
                    return true
                }
            }
        } else if (pecaDireita) {
            if (pecaDireita.classList.contains(`${pecaCorOponente}-peca`)) {


                if (celulaAtrasDireita && celulaAtrasDireita.hasChildNodes() === false) {

                    return true

                }

            }
            return false
        }
    }
    function fimDoTabuleiro(casa, corJogador) {
        const row = parseInt(casa.dataset.row);
        return (corJogador === "black" && row === 0) || (corJogador === "red" && row === 7);
    }
    function gameOver() {

        const casas = document.querySelectorAll(".casa");
        const modalWin = document.getElementById("modal-win");
        const tituloModal = document.getElementById("modal-title");

        let jogadorVermelho = 0;
        let jogadorPreto = 0;

        casas.forEach(casa => {
            const peca = casa.firstChild
            if (peca && peca.classList.contains("red-peca")) {
                jogadorVermelho++;
            } else if (peca && peca.classList.contains("black-peca")) {
                jogadorPreto++;
            }
        })

        if (jogadorVermelho == 0) {
            modalWin.style.display = "block";
            tituloModal.innerHTML = "As peças pretas venceram!"
        } else if (jogadorPreto == 0) {
            modalWin.style.display = "block";
            tituloModal.innerHTML = "As peças brancas venceram!"

        }


    }


});

