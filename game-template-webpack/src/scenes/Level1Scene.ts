import Player from "../game-object/Player";
import PlayerShip from "../game-object/PlayerShip";
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";

class Level1Scene extends Phaser.Scene
{
    private _cube: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container;
    preload ()
    {
        this.load.image('cube', 'assets/images/player.png');
        this.load.image('ship', 'assets/images/ship.png');
        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('particle', 'assets/images/particle_001.png')
    }

    create ()
    {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        this.initailize();
    }
    private initailize()
    {
        this.cameras.main.setBounds(0, 0, 1920 * 2, 1200);
        this.physics.world.setBounds(0, 0, 1920 * 2, 600);
        PlayerBehaviorManager.instance.init(this);
        this._cube = PlayerBehaviorManager.instance.stateMachine.currentState.object;
        this.cameras.main.startFollow(this._cube, true);
        // this._cube = new PlayerShip(this, 0, 400);
        if (this._cube.body instanceof Phaser.Physics.Arcade.Body)
        {
            // wheel.body.setAccelerationX(100)
            //.setBounce(1)
            this._cube.body.setCollideWorldBounds(true);
        }
        const particles = this.add.particles(0, 0, 'particle', {
            speed: 100,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD'
        });
        particles.startFollow(this._cube,0, 32,true);
        if (this.input.keyboard == null)
            throw new Error("this.input.keyboard is null");
        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === "1")
            {
                PlayerBehaviorManager.instance.stateMachine.setState("cube");
                this._cube = PlayerBehaviorManager.instance.stateMachine.currentState.object;
            }
            else if (event.key === "2")
            {
                PlayerBehaviorManager.instance.stateMachine.setState("ship");
                this._cube = PlayerBehaviorManager.instance.stateMachine.currentState.object;
            }
            if (this._cube.body instanceof Phaser.Physics.Arcade.Body)
            {
                // wheel.body.setAccelerationX(100)
                //.setBounce(1)
                this._cube.body.setCollideWorldBounds(true);
            }
            this.cameras.main.startFollow(this._cube, true);
            particles.startFollow(this._cube,0, 32,true);
        }
        );
    }
    update(time: number, delta: number): void {
        super.update(time, delta);
        this._cube.update();
    }
}
export default Level1Scene;