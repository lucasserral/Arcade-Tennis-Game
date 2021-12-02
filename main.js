canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
console.log("javascript");
var ballSize = 5;
var ballX = (canvas.width/2)-ballSize/2;
var ballY = (canvas.height/2)-ballSize/2;
var ballSpeedX = 5;
var ballSpeedY = 5;
var playersWidth = 15;
var playersHeight = 50;
var oponentPosition = (canvas.height/2)-(playersHeight/2);
var playerPosition = oponentPosition;
var ballGoingRight = true;
var ballGoingDown = true;

window.onload = function () {

    var fps = 30;
    setInterval(function () {
        __moveBall();
        __draw();
    },1000/fps);
    __draw();
}

function __moveBall() {
    // Movimiento basico de la pelota.
    if (ballGoingRight) {
        ballX += ballSpeedX;
    }
    else if (!ballGoingRight){
        ballX -= ballSpeedX;
    }
    if (ballGoingDown) {
        ballY += ballSpeedY;
    }
    else if (!ballGoingDown){
        ballY -= ballSpeedY;
    }

    // Colision con paredes del canva.
    if ( ballX + ballSize >= canvas.width || ballX <= 0 ) {
        ballGoingRight = !ballGoingRight;
    }
    if ( ballY + ballSize >= canvas.height || ballY <= 0 ) {
        ballGoingDown = !ballGoingDown;
    }
}

function __draw(){
    console.log("draw");

    context.beginPath();

    // Dibuja el fondo.
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height);

    // Dibuja la pelota.
    context.fillStyle = 'black';
    context.fillRect(ballX,ballY,ballSize,ballSize);

    // Dibuja oponente.
    context.fillStyle = 'black';
    context.fillRect(canvas.width-(playersWidth + 5),oponentPosition,playersWidth,playersHeight);

    // Dibuja jugador.
    context.fillStyle = 'black';
    context.fillRect(5,playerPosition,playersWidth,playersHeight);

    context.closePath();
}