document.addEventListener('DOMContentLoaded', ()=>{

    let cubos = document.querySelectorAll(".cubo");

    cubos.forEach((cubo)=>{
        cubo.addEventListener('click',handleClick);
    })

})




function handleClick(event){

    let cubo = event.target;
    let position = cubo.id;

    let modalWin = document.getElementById('modal-win');
    let winnerTitle = document.getElementById('modal-winner');

    if (handleMove(position)){
      
        let winner = playerTime == 1 ? 'X' : "Círculo";

        setTimeout(()=>{
            modalWin.style.display='block';
           
            winnerTitle.innerHTML = `O vencedor foi o ${winner}`;
            if(!isWin()){
                winnerTitle.innerHTML = "Houve um empate!";
            }
        }, 10)

   
    };

    updateCubo(position);

}

function updateCubo(position){
    let cubo = document.getElementById(position.toString());
    let simbolo = tabu[position];
    cubo.innerHTML = `<div class ='${simbolo}'></div>`
}

function updateCubos(){


    
    let cubos = document.querySelectorAll(".cubo");

    cubos.forEach((cubo)=>{ 
        let position = cubo.id;
        let simbolo = tabu[position];

        if (simbolo != ''){

            cubo.innerHTML = `<div class ='${simbolo}'></div>`


        }

    })
}

