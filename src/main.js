//Leon Chen (lchen166) 
//Rocket Patrol Mods
//4/19/2022
//15 hours to complete

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;

//Points Breakdown
//Implemented Background music to Play Scene (5)
//Allow the player to control the rocket after it's fired (5)
//Display the time remaining(in seconds) on the screen (10)
//Create 4 new explosion SFX and randomize which one plays on impact(10)
//Implement parallax scrolling(10)
//Implemented a new timing/scoring mechanism that adds time (2 seconds) to the clock for successful hits(20)
//Create new Spaceship type that is smaller, moves faster, and worth more points (20)
//implement mouse control for player movement and mouse click to fire(20)
