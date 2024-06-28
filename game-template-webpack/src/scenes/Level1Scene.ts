import Player from "../game-object/Player";
import PlayerShip from "../game-object/PlayerShip";
import Portal from "../game-object/Portal";
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
    }

    public create () : void
    {
        super.create();
        this._levelBGM = this.sound.add('StereoMadness', { loop: false }) as Phaser.Sound.WebAudioSound;
        this.map = this.make.tilemap({ key: 'map' });
        this.tiles = this.map.addTilesetImage('levelTiles', 'tiles');
        if (this.map == null)
            throw new Error("this.map is null");
        if (this.tiles == null)
            throw new Error("this.tiles is null");
        this.bg = this.map.createLayer('backgroundLayer', this.map.addTilesetImage('bg', 'bg')!);
        this.bg?.setName("backgroundLayer");
        this.tweenBG();
        this.layer = this.map.createLayer('foregroundLayer', this.tiles);
        this.layer?.setName("foregroundLayer");
        this.layer!.setCollisionByProperty({ collide: true });
        this._spikes = this.add.group({ runChildUpdate: true });
        this._portal = this.add.group({ runChildUpdate: true });
        this.initailize();
        this.loadObjectsFromTilemap();
        this.physics.add.collider(this._cube, this.layer!);
        this.physics.add.collider(this._spikes, this.layer!);
        this.physics.add.collider(this._cube, this._spikes,this.handleCubeSpikeCollision, undefined, this);
        this.physics.add.overlap(this._cube, this._portal, this.overlapPortal, undefined, this);
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
        // this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
        //     if (event.key === "1")
        //     {
        //         PlayerBehaviorManager.instance.stateMachine.setState("cube");
        //         this._cube = PlayerBehaviorManager.instance.stateMachine.currentState.object;
        //     }
        //     else if (event.key === "2")
        //     {
        //         PlayerBehaviorManager.instance.stateMachine.setState("ship");
        //         this._cube = PlayerBehaviorManager.instance.stateMachine.currentState.object;
        //     }
        //     this.physics.add.collider(this._cube, this.layer!);
        //     this.physics.add.collider(this._cube, this._spikes, this.handleCubeSpikeCollision, undefined, this);
        //     this.physics.add.overlap(this._cube, this._portal, this.overlapPortal, undefined, this);
        //     if (this._cube.body instanceof Phaser.Physics.Arcade.Body)
        //     {
        //         // wheel.body.setAccelerationX(100)
        //         //.setBounce(1)
        //         this._cube.body.setCollideWorldBounds(true);
        //     }
        //     this.cameras.main.startFollow(this._cube, true);
        //     particles.startFollow(this._cube,0, 32,true);
        // }
        // );
        this._levelBGM.play();
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
            if (object.type == "portal")
            {
                let nextState = object.properties.find((property: any) => property.name === "nextState")?.value;
                this._portal.add(new Portal(this, object.x!, object.y!, object.width!, object.height!, nextState)).setName(object.name);
            }
        });
    }
    private handleCubeSpikeCollision(cube: any, spike:any ): void
    {
        if (cube === this._cube)
        {
            console.log("Cube hit spike");
            cube.setVisible(false);
            cube.setActive(false);
            this.inputHandler.detach(cube);
            this.cameras.main.stopFollow();
            this._levelBGM.stop();
            this.time.delayedCall(1000, () => {
                this.scene.restart();
            });
        }
    }
    private overlapPortal(cube: any, portal: any): void
    {
        if (cube === this._cube)
        {
            console.log("Cube hit portal");
            this.physics.world.disable(portal);
            PlayerBehaviorManager.instance.stateMachine.setState(portal.nextState);
            this._cube = PlayerBehaviorManager.instance.stateMachine.currentState.object;
            this.physics.add.collider(this._cube, this.layer!);
            this.physics.add.collider(this._cube, this._spikes, this.handleCubeSpikeCollision, undefined, this);
            this.physics.add.overlap(this._cube, this._portal, this.overlapPortal, undefined, this);
            if (this._cube.body instanceof Phaser.Physics.Arcade.Body)
            {
                // wheel.body.setAccelerationX(100)
                //.setBounce(1)
                this._cube.body.setCollideWorldBounds(true);
            }
            this.cameras.main.startFollow(this._cube, true);
            const particles = this.add.particles(0, 0, 'particle', {
                speed: 100,
                scale: { start: 0.3, end: 0 },
                blendMode: 'ADD'
            });
            particles.startFollow(this._cube,0, 32,true);
        }
    }
    protected tweenBG(): void
    {
        const firstColor = Phaser.Display.Color.ValueToColor(0x0000ff);
        const secondColor = Phaser.Display.Color.ValueToColor(0xf220ff);
        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 90000,
            repeat: -1,
            yoyo: true,
            onUpdate: (tween) => {
                const value = tween.getValue();
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(firstColor, secondColor, 100, value);
                const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);
                this.bg?.setTint(color);
            }
        });

    }
}
export default Level1Scene;