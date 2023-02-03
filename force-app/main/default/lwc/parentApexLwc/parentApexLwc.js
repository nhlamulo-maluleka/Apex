import { LightningElement } from 'lwc';

export default class ParentApexLwc extends LightningElement {    
    constructor(){
        super();
        this.changeValue = 4;
        this.playerChange = 5;
        this.dx = this.changeValue;
        this.dy = this.changeValue;

        this.playerWidth = 15;
        this.playerHeight = 80;
        this.playerTop = 0;

        this.initPos = this.playerWidth + 5;
        
        this.ballLeft = this.initPos;
        this.ballTop = this.initPos;
        
        this.width = 700;
        this.height = 450;
        this.ballSize = 35;

        this.gameStarted = false;

        this.time = 20;
    }

    renderedCallback(){
        this.containerElement = this.template.querySelector('[data-id="container"]')
        this.ballElement = this.template.querySelector('[data-ball="ball"]')
        this.playerElement = this.template.querySelector('[data-player="player"]')

        // Setting the container size
        this.containerElement.style.width = `${this.width}px`;
        this.containerElement.style.height = `${this.height}px`;

        // Setting player start position
        this.playerElement.style.width = `${this.playerWidth}px`
        this.playerElement.style.height = `${this.playerHeight}px`
        this.playerElement.style.top = `${this.playerTop}px`

        // Setting the ball position
        this.moveBallPosition();
    }

    moveBallPosition(){
        this.ballElement.style.left = `${this.ballLeft}px`;
        this.ballElement.style.top = `${this.ballTop}px`;
    }

    incrementBallPosition(){
        this.ballTop += this.dy;
        this.ballLeft += this.dx;
    }

    playerPosition(){
        this.playerMovemet = setInterval(() => {
            this.playerTop += this.playerChange;

            if(this.playerTop < 0) {
                this.playerTop = 0;
                clearInterval(this.playerMovemet);
            }
            else if(this.playerTop > (this.height - this.playerHeight)){
                this.playerTop = (this.height - this.playerHeight);
                clearInterval(this.playerMovemet);
            }

            this.playerElement.style.top = `${this.playerTop}px`;
        }, this.time)
    }

    moveUp(){
        if(this.gameStarted){
            if(this.playerMovemet) clearInterval(this.playerMovemet);

            this.playerChange = -Math.abs(this.playerChange);
            this.playerPosition();
        }
    }

    moveDown(){
        if(this.gameStarted){
            if(this.playerMovemet) clearInterval(this.playerMovemet);

            this.playerChange = Math.abs(this.playerChange);
            this.playerPosition();
        }
    }

    startGame(){
        this.gameStarted = true;

        this.ballMovement = setInterval(() => {
            // Check if you hit the ball!!
            if(this.ballLeft <= 16
                && this.ballTop >= (this.playerTop-parseInt(this.playerHeight/2))
                && this.ballTop <= (this.playerTop+parseInt(this.playerHeight/2))){
                this.dx *= -1;
            }

            // Checking Bounds
            if(this.ballLeft < 5) {
                this.ballLeft = this.initPos;
                this.dx *= -1;

                this.stopGame();
                alert("Game Over!!");
            }
            else if(this.ballLeft > (this.width-this.ballSize)){
                this.ballLeft = (this.width-this.ballSize);
                this.dx *= -1;
            }
            else if(this.ballTop < this.initPos){
                this.ballTop = this.initPos;
                this.dy *= -1;
            }
            else if(this.ballTop > (this.height-this.ballSize)){
                this.ballTop = (this.height-this.ballSize);
                this.dy *= -1;
            }

            this.incrementBallPosition();
            this.moveBallPosition();
        }, this.time)
    }
    
    stopGame(){
        this.gameStarted = false;
        if(this.ballMovement) clearInterval(this.ballMovement);
        if(this.playerMovemet) clearInterval(this.playerMovemet);
    }
}