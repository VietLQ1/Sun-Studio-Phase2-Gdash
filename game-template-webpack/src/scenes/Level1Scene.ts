import Player from "../game-object/Player";

class Level1Scene extends Phaser.Scene
    {
    private _cube: Player;
        preload ()
    {
        this.load.image('ball', 'assets/images/player.png');
    }

    create ()
    {
        this._cube = new Player(this, 0, 400, 'ball');
            if (this._cube.body instanceof Phaser.Physics.Arcade.Body)
            {
                // wheel.body.setAccelerationX(100)
                //.setBounce(1)
                this._cube.body.setCollideWorldBounds(true);
            }
    }
    update(time: number, delta: number): void {
        super.update(time, delta);
        this._cube.update();
    }
    }
export default Level1Scene;