canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
console.log("javascript");
var ballSize = 5;
var ballX = (canvas.width/2)-ballSize/2;
var ballY = (canvas.height/2)-ballSize/2;
var ballSpeedX = 2;
var ballSpeedY = 2;
var playersWidth = 15;
var playersHeight = 70;
var oponentPosition = (canvas.height/2)-(playersHeight/2);
var playerPosition = oponentPosition;
var ballGoingRight = true;
var ballGoingDown = true;

window.onload = function () {
    addEventListener('mousemove',function (evt) {
        mousePos = __getMousePos(evt);
        playerPosition = mousePos.y - (playersHeight/2);
    });
    var fps = 60;
    setInterval(function () {
        __moveOponent();
        __moveBall();
        __draw();
    },1000/fps);
    __draw();
}

function __getMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
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

function __moveOponent(){
    if (ballY >= oponentPosition + 15 && ballGoingDown) {
        oponentPosition += 3;
    } else if (ballY <= oponentPosition + playersHeight -15 && !ballGoingDown) {
        oponentPosition -= 3;
    }
}

function __draw(){
    console.log("draw");

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

}

