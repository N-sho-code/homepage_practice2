class Pacman {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
    }
    moveProces() {
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackwards();
        }
    }
    eat() {

    }
    moveBackwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTION_UP:
                this.y += this.speed;
                break;
            case DIRECTION_LEFT:
                this.x += this.speed;
                break;
            case DIRECTION_BUTTOM:
                this.y -= this.speed;
                break;
        }
    }
    moveForwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed;
                break;
            case DIRECTION_BUTTOM:
                this.y += this.speed;
                break;
        }
    }
    checkCollision() {
        let isCollided = false;
        if(){

        }
        }
    checkGhostCollision() {

    }
    changeDirectionIfPossible() {

    }
    changeAnimation() {

    }
    draw() {

    }
    getMapX(){
        return parseInt(this.x/oneBlockSize)
    }
    getMapY(){
        return parseInt(this.x/oneBlockSize)
    }

}