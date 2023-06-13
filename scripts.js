
//  Configuracoes do jogo

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

//Construtor para ser implementado o sistema de lista posteriormente, para aumentar a cobrinha.
class CorpoCobrinha{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
// Velocidade inicial da cobrinha
let speed = 7; 

let tileCount = 20; // A arena eh 20x20.
let tileSize = canvas.width / tileCount - 2;

// Posicao que a cobrinha vai spawnar.
let cabX = 10;
let cabY = 10; 

//Construtor e array para o sistema que a cobrinha come e aumenta
const corpoCobrinha = [];
let tamanhoCauda= 2;

//Posicao em que a comida spawna
let uvaX = 5;
let uvaY = 5;

//Movimentacao da cobra pela arena
let velX = 0;
let velY = 0;

let pontuacao = 0



// Loop do jogo
function drawGame (){
    changePosicaoCobrinha();
    let resultado = isGameOver();
    if(resultado){
        return;
    }

    clearScreen();

    checkColisaoUva();
    drawCobrinha();
    drawUva();

    drawPontuacao();


    //Conforme o player vai avancando no game, a dificuldade aumenta.
    if (pontuacao >= 5){
        speed = 11;
    }
    if ( pontuacao >= 10){
        speed = 16;
    }
    if ( pontuacao >= 15){
        speed = 20;
    }
    if ( pontuacao >= 10){
        speed = 24;
    }

    setTimeout(drawGame, 1000 / speed);
}


//Caso a cobrinha bata no muro ou nela mesma, o player ira perder o jogo
function isGameOver(){
    let gameOver = false;
    
    //Condicao para o jogo n dar gameover de inicio, pois a cobrinha vai estar tudo junto.
    while(velY ===0 && velX ===0){
        return false;
    }
    
    //Parede
    if(cabX < 0){
        gameOver= true;
    }
    else if(cabX === tileCount){
        gameOver=true;
    }
    else if(cabY < 0){
        gameOver=true;
    }
    else if(cabY === tileCount){
        gameOver=true;
    }

    //Condicao se ela encostar nela mesma, o jogador ira perder
    for (let i = 0; i < corpoCobrinha.length; i++){
        let corpo = corpoCobrinha[i];
        if (corpo.x === cabX && corpo.y === cabY){
            gameOver = true;
            break;
        }
    }


    // Gameover aparece na tela caso o jogador perca
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width / 7, canvas.height / 2);

    }

    return gameOver;
}

//A pontuacao sera exibida na tela, 
function drawPontuacao(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Pontuação: " + pontuacao, canvas.width-70, 15);
}

// Eu decidi mudar a arena tambem, tornando ela toda preta.
function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//Geracao da cobrinha e o sistema que aumenta ela. No tb feito em sala, ela n aumentava por comida, ai achei interessante implementar.
function drawCobrinha(){
    
    ctx.fillStyle = "green";
    for(let i=0; i <corpoCobrinha.length; i++){
        let corpo = corpoCobrinha[i];
        ctx.fillRect(corpo.x * tileCount, corpo.y * tileCount, tileSize, tileSize);
    }

    //basicamente a mecanica da cobrinha ta aki
    corpoCobrinha.push(new CorpoCobrinha (cabX, cabY)); // coloca um item no final da lista próximo a cabeca da cobra.
    while (corpoCobrinha.length > tamanhoCauda){
        corpoCobrinha.shift(); //remove o item mais longe das partes da cobra se tiver mais do que o tamanho da cauda.
    }

    //Corpo da cobrinha, sendo diferente da cor da cabeca, onde a cada frutinha que ela come, ira aumentar o corpo
    ctx.fillStyle = "orange";
    ctx.fillRect(cabX * tileCount, cabY * tileCount, tileSize, tileSize);
}

//Movimentacao da cobrinha
function changePosicaoCobrinha(){
    cabX = cabX + velX;
    cabY = cabY + velY;
}

//Geracao da comida
function drawUva(){
    ctx.fillStyle = "purple";
    ctx.fillRect(uvaX * tileCount, uvaY * tileCount, tileSize, tileSize);
}

//Sistema de colisao com a comida e randomizacao da onde ela aparece, pra cobra pode aumentar e a pontuacao aumentar tambem
function checkColisaoUva(){
    if(uvaX == cabX && uvaY == cabY){
        uvaX = Math.floor(Math.random() * tileCount);
        uvaY = Math.floor(Math.random() * tileCount);
        tamanhoCauda++;
        pontuacao++;
    }
}

document.body.addEventListener('keydown',keyDown);

function keyDown(event){
    //Cima
    if(event.keyCode==38){
        if(velY == 1){
            return;
        }
        velY = -1;
        velX = 0;
    }

    //Baixo
    if(event.keyCode==40){
        if(velY == -1){
            return;
        }
        velY = 1;
        velX = 0;
    }

    //Esquerda
    if(event.keyCode==37){
        if(velX == 1){
            return;
        }
        velY = 0;
        velX = -1;
    }

    //Direita
    if(event.keyCode==39){
        if(velX == -1){
            return;
        }
        velY = 0;
        velX = 1;
    }
}

drawGame();
