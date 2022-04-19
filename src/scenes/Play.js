//Leon Chen (lchen166) 
//Rocket Patrol Mods
//4/19/2022
//15 hours to complete

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        //small ship
        this.load.image('fastship', './assets/fastship.png');
        //rocks background
        this.load.image('rocks', './assets/rocks.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        //background music
        this.load.audio('sfx_Monkey', './assets/MPM.mp3');

        
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //place the rock background
        this.rockbackground = this.add.tileSprite(0, 0, 640, 480, 'rocks').setOrigin(0,0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);


        //add new Spaceship (small/fast)
        this.ship04 = new Fastship(this, game.config.width + borderUISize*1.5, borderUISize*3.25, 'fastship', 0, 40).setOrigin(0, 0);

        // define keys
        //keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add mouse
        MouseEvent = this.input;


        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // create a game timer
        this.timer = game.settings.gameTimer;

        let timerConfig =
        {
            fontFamily: "Courier",
            fontSize: "20px",
            backgroundColor: "#f3b141",
            color: "#843605",
            align: "left",
            padding: {
                top: 5, 
                bottom: 5},
            fixedWidth: 100
        };
        // add the text to the screen
        this.times = 'Time';
        this.timeLeft = this.add.text(borderUISize*8 + borderPadding, borderUISize + borderPadding*2, this.times, timerConfig);
        (
            this.formatTime(this.timer), timerConfig
        );
        // count down
        //https://phaser.discourse.group/t/countdown-timer/2471
        this.timedEvent = this.time.addEvent ({
                delay: 1000, callback: () => { 
                    this.timer -= 1000; 
                    this.timeLeft.text = this.formatTime(this.timer);
                },
                scope: this,
                loop: true
            });

        // //add points if explosion
        // this.timeadd = this.time.addEvent ({
        //     delay: 1000, callback: () => {
        //         this,timer += 2000;
        //         this.timeLeft.text = this.formatTime(this.timer);
        //     },
        //     scope: this,
        //     loop: true
        // });


        //add music
        this.sound.play('sfx_Monkey');

        // //speed Increase
        // this.speed = 1;
        // if (this.clock = this.time.delayedCall(game.settings.gameTimer/2, () => {
        //     this.speed = 2;
        // }, null, this));

    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            //stop sound
            this.game.sound.stopAll();
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.game.sound.stopAll();
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite

        this.rockbackground.tilePositionX -= 6; //update rocks

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }


        //speed Increase
        // this.speed = 1;
        // if (this.clock = this.time.delayedCall(game.settings.gameTimer/2, () => {
        //     this.speed = 2;
        // }, null, this));

    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {


    //add points if explosion
    this.timeadd = this.time.addEvent ({
        delay: 1000, callback: () => {
            this.timer += 2000;
            this.timeLeft.text = this.formatTime(this.timer);
        },
        scope: this,
        loop: false
    });

        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        
        //this.sound.play('sfx_explosion');
        this.sound.play(Phaser.Math.RND.pick(['SFX1', 'SFX2', 'SFX3', 'SFX4']));
      }


      //https://phaser.discourse.group/t/countdown-timer/2471
      formatTime(ms)
      {
          let s = ms/1000;
          let min = Math.floor(s/60);
          let seconds = s%60;
          seconds = seconds.toString().padStart(2, "0");
          return `${min}:${seconds}`;
      }

}