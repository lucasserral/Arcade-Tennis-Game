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
var oponentPositionY = (canvas.height/2)-(playersHeight/2);
var playerPositionY = oponentPositionY;
var playerPositionX = 5;
var ballGoingRight = true;
var ballGoingDown = true;
var oponentPositionX = canvas.width-(playersWidth + 5);

window.onload = function () {
    addEventListener('mousemove',function (evt) {
        mousePos = __getMousePos(evt);
        playerPositionY = mousePos.y - (playersHeight/2);
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

    // Colision con jugadores.
    if ( (ballX + ballSize >= oponentPositionX && ballX < oponentPositionX + playersWidth && ballY >= oponentPositionY && ballY <= oponentPositionY + playersHeight ) || ( ballX <= playerPositionX + playersWidth && ballX >= playerPositionX && ballY >= playerPositionY && ballY <= playerPositionY + playersHeight )) {
        ballGoingRight = !ballGoingRight;
    }
    // Colision con las paredes del canva.
    if ( ballY + ballSize >= canvas.height || ballY <= 0 ) {
        ballGoingDown = !ballGoingDown;
    }
    if ( ballX < 0 || ballX > canvas.width ) {
        ballX = (canvas.width/2)-ballSize/2;
        ballY = (canvas.height/2)-ballSize/2;
    }


}

function __moveOponent(){
    if (ballY >= oponentPositionY + 15 && ballGoingDown) {
        oponentPositionY += 3;
    } else if (ballY <= oponentPositionY + playersHeight -15 && !ballGoingDown) {
        oponentPositionY -= 3;
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
    context.fillRect(oponentPositionX,oponentPositionY,playersWidth,playersHeight);

    // Dibuja jugador.
    context.fillStyle = 'black';
    context.fillRect(playerPositionX,playerPositionY,playersWidth,playersHeight);

}

