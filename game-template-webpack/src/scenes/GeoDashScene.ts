import Coin from "../game-object/Coin";
import GravityPad from "../game-object/GravityPad";
import JumpOrb from "../game-object/JumpOrb";
import JumpPad from "../game-object/JumpPad";
import LevelEndPoint from "../game-object/LevelEndPoint";
import Portal from "../game-object/Portal";
import Spikes from "../game-object/Spikes";
import InputHandler from "../input/InputHandler";
import LevelProgressManager from "../manager/LevelProgressManager";
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";
import LevelProgressScene from "./LevelProgressScene";

enum LevelState {PLAYING, PAUSED, COMPLETED, FAILED};
class GeoDashScene extends Phaser.Scene
{
    protected _levelState: LevelState;
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
        this._levelState = LevelState.PLAYING;
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setFPS(144);
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
        if (!this._levelBGM.isPlaying)
        {
            this._levelBGM.play();   
        }
        this.scene.launch('LevelProgress');
        this.scene.launch('UI');
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
            if (object.type == "jumpPad")
            {
                this._trigger.add(new JumpPad(this, object.x!, object.y!, object.width!, object.height!, -1300)).setName(object.name);
            }
            if (object.type == "gravPad")
            {
                this._trigger.add(new GravityPad(this, object.x!, object.y!, object.width!, object.height!)).setName(object.name);
            }
            if (object.type == "jumpOrb")
            {
                this._trigger.add(new JumpOrb(this, object.x!, object.y!, object.width!, object.height!, -1100)).setName(object.name);
            }
            if (object.type == "endpoint")
            {
                console.log(object.x, object.y, object.width, object.height)
                this._trigger.add(new LevelEndPoint(this, object.x!, object.y!, object.width!, object.height!)).setName(object.name);
                //this._trigger.add(new LevelEndPoint(this, object.x!, object.y!, object.width!, object.height!)).setName(object.name);
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
                else if(tile.properties.isPlatform && body.position.y >= tile.pixelY)
                {
                    
                }
                else
                {
                    if (this._levelState === LevelState.COMPLETED || this._levelState === LevelState.FAILED)
                    {
                        return;
                    }
                    this._levelState = LevelState.FAILED;
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
            else if (body.blocked.left && !PlayerBehaviorManager.instance.stateMachine.currentState.playerRule.collideLeft)
            {
                if (tile.properties.isPlatform && body.position.y < tile.pixelY - 32)
                {
                    console.log("Cube hit left");
                    body.setVelocityY(-200);
                }
                else if (tile.properties.isPlatform && body.position.y >= tile.pixelY)
                {

                }
                else
                {
                    if (this._levelState === LevelState.COMPLETED || this._levelState === LevelState.FAILED)
                    {
                        return;
                    }
                    this._levelState = LevelState.FAILED;
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
            else if (body.blocked.up && !PlayerBehaviorManager.instance.stateMachine.currentState.playerRule.collideTop)
            {
                if (tile.properties.isPlatform && body.position.y >= tile.pixelX)
                {

                }
                else
                {
                    if (this._levelState === LevelState.COMPLETED || this._levelState === LevelState.FAILED)
                    {
                        return;
                    }
                    this._levelState = LevelState.FAILED;
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
    }
    protected handleCubeSpikeCollision(cube: any, spike:any ): void
    {
        if (cube === this._cube)
        {
            if (this._levelState === LevelState.COMPLETED || this._levelState === LevelState.FAILED)
            {
                return;
            }
            this._levelState = LevelState.FAILED;
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
            this.physics.add.overlap(this._cube, this._trigger, this.handleTriggerCollision, undefined, this);
            if (this._cube.body instanceof Phaser.Physics.Arcade.Body)
            {
                this._cube.body.setCollideWorldBounds(true);
                this._cube.body.setGravity(0);
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
    protected handleTriggerCollision(cube: any, trigger: any): void
    {
        if (cube === this._cube)
        {
            let body = cube.body as Phaser.Physics.Arcade.Body;
            if (trigger instanceof JumpPad && !(trigger instanceof GravityPad))
            {
                body.setVelocityY(trigger.jumpForce);
                // body.setGravityY(-3050);
                this.physics.world.disable(trigger);
            }
            else if (trigger instanceof GravityPad)
            {
                body.setGravityY(-7000);
            }
            else if (trigger instanceof JumpOrb)
            {
                if (this.input.keyboard?.keys[Phaser.Input.Keyboard.KeyCodes.SPACE].isDown || this.input.activePointer.isDown)
                {
                    body.setVelocityY(trigger.jumpForce);
                }
            }
            else if (trigger instanceof LevelEndPoint)
            {
                this._levelState = LevelState.COMPLETED;
                this.physics.world.disable(trigger);
                this.scene.stop("UI");
                this._levelBGM.stopAndRemoveBufferSource();
                this.sound.play('levelComplete', { loop: false });
                this.tweens.add({
                    targets: cube,
                    x: this.map.widthInPixels,
                    y: this.game.renderer.height / 2,
                    scale: 0,
                    duration: 4000,
                    ease: 'Back.inOut',
                    onComplete: () => {
                        this.scene.stop();
                        this.scene.stop("LevelProgress");
                        this.scene.launch("LevelComplete");
                    }
                });
                // this.time.delayedCall(4000, () => {
                //     this.scene.stop();
                //     this.scene.stop("LevelProgress");
                // });
                //this.scene.launch("LevelComplete");
            }
        }
    }
    public get cube(): Phaser.GameObjects.Sprite | Phaser.GameObjects.Container
    {
        return this._cube;
    }
    public update(time: number, delta: number): void {
        super.update(time, delta);
        if (this._levelState === LevelState.PLAYING)
        {
            PlayerBehaviorManager.instance.update();
        }
    }
    public pause(): void
    {
        this._levelState = LevelState.PAUSED;
        this.scene.pause();
        this._levelBGM.pause();
    }
    public resume(): void
    {
        this._levelState = LevelState.PLAYING;
        this.scene.resume();
        this._levelBGM.resume();
    }
    public stop(): void
    {
        this.scene.stop();
        this.scene.stop("UI");
        this.scene.stop("LevelProgress");
        this._levelBGM.stopAndRemoveBufferSource();
    }
    protected playerDeath(): void
    {
        this._explode.play();
        let flame = this.add.particles(this._cube.x, this._cube.y, 'particle', {
            color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
            colorEase: 'quad.out',
            lifespan: 1000,
            scale: { start: 0.70, end: 0, ease: 'sine.out' },
            speed: 200,
            advance: 1000,
            frequency: 20,
            blendMode: 'ADD',
            duration: 200,
        });
        flame.setDepth(1);
        flame.once("complete", () => {
            flame.destroy();
        });
        if (LevelProgressScene.newBest == true)
        {
            console.log('New Best');
            let newBestBanner = this.add.image(PlayerBehaviorManager.instance.playerPosition.x, this.game.renderer.height / 2, 'newBest').setOrigin(0.5, 0.5);
            let newBest = this.add.text(PlayerBehaviorManager.instance.playerPosition.x, this.game.renderer.height / 2 + 200, 
                (Math.round(LevelProgressManager.getInstance().getLevelProgress(this.scene.key)*100)).toString() + "%", 
                { fontSize: '100px', color: '#FFD700', fontStyle: 'bold'}).setOrigin(0.5, 0.5);
            this.time.delayedCall(1000, () => {
                newBestBanner.destroy();
                newBest.destroy();
            });
        }
        this.scene.pause("UI");
    }
}
export default GeoDashScene;