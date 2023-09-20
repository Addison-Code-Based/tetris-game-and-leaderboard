//https://www.youtube.com/watch?v=H2aW5V46khA&feature=emb_logo

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

var music;
music = new soundMusic("tetris.mp3");
soundRotate = new soundEffectHalf("tetris_rotate.mp3");
soundEnd = new soundEffectHalf("tetris_end.mp3");
soundBump = new soundEffect("tetris_bump.mp3");
soundMove = new soundEffectHalf("tetris_move.mp3");
soundScore = new soundEffectHalf("tetris_score.mp3");
music.play();

//https://www.w3schools.com/graphics/game_sound.asp
//https://www.w3schools.com/graphics/tryit.asp?filename=trygame_sound_music
//function to add game music
function soundMusic(src) {
    this.soundMusic = document.createElement("audio");
    this.soundMusic.src = src;
    this.soundMusic.setAttribute("preload", "auto");
    this.soundMusic.setAttribute("controls", "none");
    this.soundMusic.style.display = "none";
    document.body.appendChild(this.soundMusic);
    this.play = function(){
		this.soundMusic.loop = true;
        this.soundMusic.play();
		this.soundMusic.volume = 0.075;
    }
    this.stop = function(){
        this.soundMusic.pause();
    }    
}
//fucntion to add sound effects
function soundEffect(src) {
    this.soundEffect = document.createElement("audio");
    this.soundEffect.src = src;
    this.soundEffect.setAttribute("preload", "auto");
    this.soundEffect.setAttribute("controls", "none");
    this.soundEffect.style.display = "none";
    document.body.appendChild(this.soundEffect);
	this.play = function(){
        this.soundEffect.play();
    }
    this.stop = function(){
        this.soundEffect.pause();
    }    
}
//some sounds were too loud
function soundEffectHalf(src) {
    this.soundEffectHalf = document.createElement("audio");
    this.soundEffectHalf.src = src;
    this.soundEffectHalf.setAttribute("preload", "auto");
    this.soundEffectHalf.setAttribute("controls", "none");
    this.soundEffectHalf.style.display = "none";
    document.body.appendChild(this.soundEffectHalf);
	this.play = function(){
        this.soundEffectHalf.play();
		this.soundEffectHalf.volume = 0.1;
    }
    this.stop = function(){
        this.soundEffectHalf.pause();
    }    
}

//function that checks for full rows and removes them and adds to score
function arenaSweep() {
    let rowCount = 1;
    
    //if find 0 then skip to next row
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        //take row out and shift other rows down
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
		soundScore.play();
    }
}

//function that defines collision as outside game area or if piece exists in place
function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

//function that makes the game area a matrix that pieces move through
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

//function that creates the different pieces
//numbers in matrices represent corresponding colors
function createPiece(type)
{
    if (type === 'I') { //create the I piece
        return [
            [0, 1, 0, 0], //requires larger matrix
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') { //create the L piece
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') { //create the J piece
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') { //create the square piece
        return [
            [4, 4], //doesn't rotate
            [4, 4],
        ];
    } else if (type === 'Z') { //create the Z piece
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') { //create the S piece
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') { //create the T piece
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

//draw game area in on canvas
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}
//draw area
function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    //draw dropped pieces
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

//function that fills the matrix of the area with the position values of the piece
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

//function to rotate piece by switching row with column and reversing values
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

//function to make piece drop
function playerDrop() {
    player.pos.y++;
	soundMove.play();
    
    //if collide with piece or bottom of game area than stop current piece and spawn new piece
    if (collide(arena, player)) {
		soundBump.play();
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    } 
	totalTime /= 1000;
	document.getElementById("timeShow").innerText = totalTime + " seconds";
	document.getElementById("time").value = totalTime;
	totalTime *= 1000;
	totalTime += dropCounter;
    dropCounter = 0;
}

//function to take input for player movement
function playerMove(offset) {
    player.pos.x += offset;
    
    //if player collides with edge or another piece then move back
    if (collide(arena, player)) {
        player.pos.x -= offset;
    }
}

//function called when previous piece is set and randomly gives next piece at top of area
function playerReset() {
    
    //game pieces
    const pieces = 'TJLOSZI';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    
    //top
    player.pos.y = 0;
    
    //middle
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    
    //end game, stop creation of pieces, stop music, record final time and score
    if (collide(arena, player)) {
		music.stop();
		soundEnd.play();
		javascript_abort();
		totalTime /= 1000;
		document.getElementById("playerScore").value = player.score;
		document.getElementById("timeShow").innerText = totalTime + " seconds";
		document.getElementById("time").value = totalTime;
    }
}

//function to stop game
function javascript_abort()
{
   throw new Error('This is not an error. This is just to abort javascript');
}

//function to take input from controls and call rotate
function playerRotate(dir) {
	soundRotate.play();
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    
    //keep piece from rotating in a manner that puts piece outside of game area or into another piece
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        
        //if too far of adjustment then go back
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}
//https://www.ostraining.com/blog/coding/stopwatch/
//initialize drop counter
let dropCounter = 0;
//set drop to every second
let dropInterval = 500;

let lastTime = 0;
//initialize final time var
var totalTime = 0;

//function to make piece drop relative to time
function update(time = 0) { 
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    lastTime = time;

    draw();
    requestAnimationFrame(update);
}

//function that displays score on the page
function updateScore() {
    document.getElementById('score').innerText = player.score;
	document.getElementById("playerScore").value = player.score;
}
//add keyboard controls
document.addEventListener('keydown', event => {
    if (event.keyCode === 37) { //move left with left arrow
        playerMove(-1);
		soundMove.play();
    } 
    else if (event.keyCode === 39) { //move right with right arrow
        playerMove(1);
		soundMove.play();
    } 
    else if (event.keyCode === 40) { //move down with down arrow
        playerDrop(); //call function instead to prevent a double drop with timer
    } 
    else if (event.keyCode === 90) { //rotate toward the left with 'z'
		soundRotate.play();
        playerRotate(-1);
    } 
    else if (event.keyCode === 88) { //rotate toward right with 'x'
		soundRotate.play();
        playerRotate(1);
    }
});

//assign colors
const colors = [
    null, //0
    '#00FFFF', //1
    '#F19E0D', //2
    '#FF0498', //3
    '#FFE138', //4
    '#439038', //5
    '#E63F1B', //6
    '#9104FF', //7
];

//create game area
const arena = createMatrix(12, 20);


//initialize score and staring position
const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};

document.getElementById("playerScore").value = player.score;
playerReset();
updateScore();
update();
