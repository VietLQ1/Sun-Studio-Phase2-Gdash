import Player from "../game-object/Player";
import PlayerShip from "../game-object/PlayerShip";
import Spikes from "../game-object/Spikes";
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";
import GeoDashScene from "./GeoDashScene";

class Level1Scene extends GeoDashScene
{
    constructor ()
    {
        super('Level1');
    }
    public preload () : void
    {
        this.load.image('cube', 'assets/images/player.png');
        this.load.image('ship', 'assets/images/ship.png');
        this.load.image('particle', 'assets/images/particle_001.png')
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/stereo-madness.json');
        this.load.image('tiles', 'assets/tilemaps/kenney_redux_64x64.png');
    }

    public create () : void
    {
        super.create();
        this.map = this.make.tilemap({ key: 'map' });
        this.tiles = this.map.addTilesetImage('levelTiles', 'tiles');
        if (this.map == null)
            throw new Error("this.map is null");
        if (this.tiles == null)
            throw new Error("this.tiles is null");
        this.bg = this.map.createLayer('backgroundLayer', this.map.addTilesetImage('bg', 'bg')!);
        this.bg?.setName("backgroundLayer");
        this.bg?.setTint(0x0000ff);
        this.layer = this.map.createLayer('foregroundLayer', this.tiles);
        this.layer?.setName("foregroundLayer");
        this.layer!.setCollisionByProperty({ collide: true });
        this._spikes = this.add.group({ runChildUpdate: true });
        this.initailize();
        this.loadObjectsFromTilemap();
        this.physics.add.collider(this._cube, this.layer!);
        this.physics.add.collider(this._spikes, this.layer!);
        this.physics.add.collider(this._cube, this._spikes,this.handleCubeSpikeCollision, undefined, this);
    }
    private initailize(): void
    {
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
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
            scale: { start: 0.3, end: 0 },
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
            this.physics.add.collider(this._cube, this.layer!);
            this.physics.add.collider(this._cube, this._spikes, this.handleCubeSpikeCollision, undefined, this);
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
    public update(time: number, delta: number): void {
        super.update(time, delta);
        //this.physics.world.collide(this._cube, this.layer!);
        this._cube.update();
    }
    private loadObjectsFromTilemap():void
    {
        const objects = this.map.getObjectLayer('object Layer')!.objects as any[];
        objects.forEach((object) => {
            if (object.type == "spike")
            {
                this._spikes.add(new Spikes(this, object.x!, object.y!, object.width!, object.height!)).setName(object.name);
                
            }
        });
    }
    private handleCubeSpikeCollision(cube: any, spike:any ): void
    {
        console.log("Cube hit spike");
        cube.setVisible(false);
        cube.setActive(false);
        this.cameras.main.stopFollow();
        this.time.delayedCall(1000, () => {
            this.scene.restart();
        });
    }
}
export default Level1Scene;