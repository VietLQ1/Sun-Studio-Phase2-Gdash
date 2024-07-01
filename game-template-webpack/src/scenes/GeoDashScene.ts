import Coin from "../game-object/Coin";
import Portal from "../game-object/Portal";
import Spikes from "../game-object/Spikes";
import InputHandler from "../input/InputHandler";
import LevelProgressManager from "../manager/LevelProgressManager";
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";

class GeoDashScene extends Phaser.Scene
{
    protected _cube : Phaser.GameObjects.Sprite | Phaser.GameObjects.Container;
    protected _spikes : Phaser.GameObjects.Group;
    protected _collectibles : Phaser.GameObjects.Group;
    protected _collectibleCount : number;
    protected _portal : Phaser.GameObjects.Group;
    protected _trigger : Phaser.GameObjects.Group;
    protected _levelBGM : Phaser.Sound.WebAudioSound;
    protected _explode : Phaser.Sound.WebAudioSound;
    public map : Phaser.Tilemaps.Tilemap;
    public tiles : Phaser.Tilemaps.Tileset | null;
    public layer : Phaser.Tilemaps.TilemapLayer | null;
    public bg : Phaser.Tilemaps.TilemapLayer | null;
    public inputHandler : InputHandler;
    constructor (config: string | Phaser.Types.Scenes.SettingsConfig)
    {
        super(config);
    }
    public create(): void
    {
        this._explode = this.sound.add('explode', { loop: false }) as Phaser.Sound.WebAudioSound;
        this.inputHandler = new InputHandler(this);
    }
    protected tweenBG(): void{}
    protected createLevelMap(): void
    {
    }
    protected initailize(): void
    {
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        PlayerBehaviorManager.instance.init(this);
        this._cube = PlayerBehaviorManager.instance.stateMachine.currentState.object;
        //console.log(PlayerBehaviorManager.instance.currentScene);
        this.cameras.main.startFollow(this._cube, true);
        if (this._cube.body instanceof Phaser.Physics.Arcade.Body)
        {
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
        this._levelBGM.play();
        this.scene.launch('LevelProgress');
        //this._collectibles.add(new Coin(this, 100, 1000));
    }
    protected loadObjectsFromTilemap():void
    {
        this._collectibleCount = 0;
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
            if (object.type == "coin")
            {
                this._collectibles.add(new Coin(this, object.x!, object.y!)).setName(object.name);
            }
        });
    }
    protected handleMapCollision(cube: any, tile: any): void
    {
        tile = tile as Phaser.Tilemaps.Tile;
        if (cube === this._cube)
        {
            let body = cube.body as Phaser.Physics.Arcade.Body;
            if (body.blocked.right && !PlayerBehaviorManager.instance.stateMachine.currentState.playerRule.collideRight)
            {
                if (tile.properties.isPlatform && body.position.y < tile.pixelY - 32)
                {
                    console.log(body.position.y, tile.pixelY);
                    body.setVelocityY(-200);
                }
                else
                {
                    this.physics.world.remove(cube.body);
                    this.playerDeath();
                    cube.setVisible(false);
                    cube.setActive(false);
                    this.inputHandler.detach(cube);
                    this.cameras.main.stopFollow();
                    this._levelBGM.stopAndRemoveBufferSource();
                    this.time.delayedCall(1000, () => {
                        this.scene.restart();
                    });
                }
            }
            if (body.blocked.left && !PlayerBehaviorManager.instance.stateMachine.currentState.playerRule.collideLeft)
            {
                if (tile.properties.isPlatform)
                {
                    console.log("Cube hit left");
                    body.setVelocityY(-910);
                }
                else
                {
                    this.physics.world.remove(cube.body);
                    this.playerDeath();
                    cube.setVisible(false);
                    cube.setActive(false);
                    this.inputHandler.detach(cube);
                    this.cameras.main.stopFollow();
                    this._levelBGM.stopAndRemoveBufferSource();
                    this.time.delayedCall(1000, () => {
                        this.scene.restart();
                    });
                }
            }
            if (body.blocked.up && !PlayerBehaviorManager.instance.stateMachine.currentState.playerRule.collideTop)
            {
                this.physics.world.remove(cube.body);
                this.playerDeath();
                cube.setVisible(false);
                cube.setActive(false);
                this.inputHandler.detach(cube);
                this.cameras.main.stopFollow();
                this._levelBGM.stopAndRemoveBufferSource();
                this.time.delayedCall(1000, () => {
                    this.scene.restart();
                });
            }
        }
    }
    protected handleCubeSpikeCollision(cube: any, spike:any ): void
    {
        if (cube === this._cube)
        {
            this.physics.world.remove(cube.body);
            console.log("Cube hit spike");
            this.playerDeath();
            cube.setVisible(false);
            cube.setActive(false);
            this.inputHandler.detach(cube);
            this.cameras.main.stopFollow();
            this._levelBGM.stopAndRemoveBufferSource();
            this.time.delayedCall(1000, () => {
                this.scene.restart();
            });
        }
    }
    protected overlapPortal(cube: any, portal: any): void
    {
        if (cube === this._cube)
        {
            console.log("Cube hit portal");
            this.physics.world.disable(portal);
            PlayerBehaviorManager.instance.stateMachine.setState(portal.nextState);
            this._cube = PlayerBehaviorManager.instance.stateMachine.currentState.object;
            this.physics.add.collider(this._cube, this.layer!, this.handleMapCollision, undefined, this);
            this.physics.add.collider(this._cube, this._spikes, this.handleCubeSpikeCollision, undefined, this);
            this.physics.add.overlap(this._cube, this._portal, this.overlapPortal, undefined, this);
            this.physics.add.overlap(this._cube, this._collectibles, this.overlapCollectible, undefined, this);
            if (this._cube.body instanceof Phaser.Physics.Arcade.Body)
            {
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
    protected overlapCollectible(cube: any, collectible: any): void
    {
        if (cube === this._cube)
        {
            let coin = collectible as Coin;
            this.physics.world.disable(collectible);
            this._collectibleCount++;
            collectible.setVisible(false);
            LevelProgressManager.getInstance().setLevelProgress(this.scene.key + 'coins', this._collectibleCount);
        }
    }
    public get cube(): Phaser.GameObjects.Sprite | Phaser.GameObjects.Container
    {
        return this._cube;
    }
    protected playerDeath(): void
    {
        this._explode.play();
        let flame = this.add.particles(this._cube.x, this._cube.y, 'particle', {
            color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
            colorEase: 'quad.out',
            lifespan: 500,
            scale: { start: 0.70, end: 0, ease: 'sine.out' },
            speed: 200,
            advance: 500,
            frequency: 50,
            blendMode: 'ADD',
            duration: 200,
        });
        flame.setDepth(1);
        flame.once("complete", () => {
            flame.destroy();
        });
    }
}
export default GeoDashScene;