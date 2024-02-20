// Iniciar variaveis

let tabu = ['', '', '', '', '', '', '', '', ''];
let playerTime = 1;
let simbolo = ['o', 'x'];

let gameOver = false;


function handleMove(position) {

    if (gameOver) {
        return;
    }


    if (tabu[position] == '') {
        tabu[position] = simbolo[playerTime];
        gameOver = isWin();

      
        if (!gameOver){
            if(isDraw()){
                gameOver = true;
            }
            else{
                playerTime = (playerTime == 0) ? 1 : 0;
            }

            
       
    }

   
}
return gameOver;
}  


function isDraw() {
    for (let i = 0; i < tabu.length; i++) {
        if (tabu[i] == '') {
            return false; 
        }
    }
    return true; 
}
function isWin() {
  
    let winStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6] 
    ]

    for (let i =0; i < winStates.length; i++) {


        let seq = winStates[i];

        let pos1 = seq[0] ;
        let pos2 = seq[1];
        let pos3 = seq[2];
        
        if (tabu[pos1] == tabu[pos2] && tabu[pos1] == tabu[pos3] && tabu[pos1] != '')  {

            return true;

        }
        
    }
    return false;

  
}