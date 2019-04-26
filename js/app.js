// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -101;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y ;
        this.sprite = 'images/char-boy.png';
    }
    
    update() {
        // check if player collide with enemy then reset player position
        for(let bug of allEnemies) {
            if ((this.x < bug.x + 70) && (this.x + 70 > bug.x) && (this.y < bug.y + 60) && (this.y + 60 > bug.y)) {
                this.reset();
            }
        }
        // check if player reach the river and show modal box
        if(this.y === 55) {
            const popup = document.querySelector('.popup');
            popup.classList.remove('hide');
            allEnemies = [];
        }
    }
    // draw player on the screen 
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    // to reset the player position
    reset() {
        this.x = 202;
        this.y = 387;
    }

    // update player position based on the user input
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= 101;
                }
                break;
            case 'up':
                if (this.y > 83) {
                    this.y -= 83;
                }
                break;
            case 'right':
                if (this.x < 404) {
                    this.x += 101
                }
                break;
            case 'down':
                if (this.y < 380) {
                    this.y += 83
                }
                break;            
        }
    }
}

// creating player opject and set it to the middle bottom of the canvas
let player = new Player(202, 387);

// creating enemies objects and set them position and speed
let enemy1 = new Enemy((-101 * 4), 0, 300);
let enemy2 = new Enemy((-101 * 3), 83, 200);
let enemy3 = new Enemy((-101 * 7), 83, 200);
let enemy4 = new Enemy((-101 * 7), 0, 300);
let enemy5 = new Enemy((-101 * 4), (83 * 2), 400);

// Place all enemies objects in an array 
let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

// This listens for key presses and sends the keys to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// adding listener to the replay button and refresh the game
document.querySelector('.replay').addEventListener('click', () => {
    window.location.reload();
});

