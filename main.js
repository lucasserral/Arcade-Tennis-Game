canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
console.log("javascript");
var ballSize = 5;
var ballX = (canvas.width/2)-ballSize/2;
var ballY = (canvas.height/2)-ballSize/2;
var ballSpeedX = 4;
var ballSpeedY = 2;
var playersWidth = 15;
var playersHeight = 100;
var oponentPositionY = (canvas.height/2)-(playersHeight/2);
var playerPositionY = oponentPositionY;
var playerPositionX = 5;
var ballGoingRight = true;
var ballGoingDown = true;
var oponentPositionX = canvas.width-(playersWidth + 5);
var playerPoints = 0, oponentPoints = 0;
var pause = false;

window.onload = function () {
    addEventListener('mousemove',function (evt) {
        mousePos = __getMousePos(evt);
        if (mousePos.y < canvas.height && mousePos.y > 0) {
            playerPositionY = mousePos.y - (playersHeight/2);
        }
    });
    addEventListener('mousedown', function(){
        if (pause) {
            ballX = (canvas.width/2)-ballSize/2;
            ballY = (canvas.height/2)-ballSize/2;
            ballSpeedX = 4;
            ballSpeedY = 2;
            oponentPositionY = (canvas.height/2)-(playersHeight/2);
            playerPoints = 0, oponentPoints = 0;
            pause = false;
        }
    });
    var fps = 60;
    setInterval(function () {
        __moveGame();
        if (playerPoints == 5 || oponentPoints == 5) {
            pause = true;
            __winningEvent()
            return;
        }
        __draw();
    },1000/fps);
}

function __moveGame(){
    if (pause){
        return;
    }
    __moveOponent();
    __moveBall();
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
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colision con jugadores.
    if ( ballX <= playerPositionX + playersWidth && ballX >= playerPositionX && ballY >= playerPositionY && ballY <= playerPositionY + playersHeight ) {
        ballSpeedX = (-1)*ballSpeedX;
        ballSpeedY = (ballY - (playerPositionY + playersHeight/2))*0.2;
    }
    if ( ballX + ballSize >= oponentPositionX && ballX < oponentPositionX + playersWidth && ballY >= oponentPositionY && ballY <= oponentPositionY + playersHeight) {
        ballSpeedX = (-1)*ballSpeedX;
        ballSpeedY = (ballY - (oponentPositionY + playersHeight/2))*0.2 ;
    }
    // Colision con las paredes del canva.
    if ( ballY + ballSize >= canvas.height || ballY <= 0 ) {
        ballSpeedY = (-1)*ballSpeedY;
    }
    if ( ballX < 0 ) {
        ballX = (canvas.width/2)-ballSize/2;
        ballY = (canvas.height/2)-ballSize/2;
        ballSpeedY = 2;
        oponentPoints++;
    }
    if ( ballX > canvas.width ) {
        ballX = (canvas.width/2)-ballSize/2;
        ballY = (canvas.height/2)-ballSize/2;
        ballSpeedY = 2;
        playerPoints++;
    }


}

function __moveOponent(){
    if (ballY >= oponentPositionY + 60) {
        oponentPositionY += 5;
    } else if (ballY <= oponentPositionY + playersHeight -60) {
        oponentPositionY -= 5;
    }
}

function __winningEvent(){
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height);

    context.fillStyle = 'black';
    context.fillText(playerPoints,100,100);
    context.fillText(oponentPoints,canvas.width - 100 ,100);
    if (playerPoints > oponentPoints){
        context.fillText("You win!",canvas.width/2 - 50 ,canvas.height/2);
    }
    else{
        context.fillText("You were defeated!",canvas.width/2 - 50 ,canvas.height/2);
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
    context.fillRect(oponentPositionX,oponentPositionY,playersWidth,playersHeight);

    // Dibuja jugador.
    context.fillRect(playerPositionX,playerPositionY,playersWidth,playersHeight);

    // Dibuja puntaje.
    context.fillText(playerPoints,100,100);
    context.fillText(oponentPoints,canvas.width - 100 ,100);

    // Dibuja red.
    for (let i = 0; i <= canvas.height ; i = i + 10) {
        context.fillRect((canvas.width/2 )-1,i,2,5);
    }
}

