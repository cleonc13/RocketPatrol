//fastship
class Fastship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene,x, y, texture, frame);
        scene.add.existing(this); //add object to existing scene
        this.points = pointValue;
        this.Speed = game.settings.fastshipSpeed;
    }
    update(){
        //move spaceship left
        this.x -= this.Speed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }
    //position reset
    reset(){
        this.x = game.config.width;
    }
}