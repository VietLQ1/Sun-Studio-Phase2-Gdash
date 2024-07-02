
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";
import GeoDashScene from "./GeoDashScene";

class Level2Scene extends GeoDashScene
{
    constructor ()
    {
        super('Level2');
    }
    public preload () : void
    {
    }

    public create () : void
    {
        super.create();
        this._levelBGM = this.sound.add('BackOnTrack', { loop: false }) as Phaser.Sound.WebAudioSound;
        this.createLevelMap();
        this.initailize();
        this.loadObjectsFromTilemap();
        this.physics.add.collider(this._cube, this.layer!, this.handleMapCollision, undefined, this);
        this.physics.add.collider(this._spikes, this.layer!);
        this.physics.add.collider(this._cube, this._spikes,this.handleCubeSpikeCollision, undefined, this);
        this.physics.add.overlap(this._cube, this._portal, this.overlapPortal, undefined, this);
        this.physics.add.overlap(this._cube, this._collectibles, this.overlapCollectible, undefined, this);
        this.physics.add.collider(this._cube, this._trigger, this.handleTriggerCollision, undefined, this);
    }
    protected createLevelMap(): void {
        this.map = this.make.tilemap({ key: 'lv2' });
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
        this._collectibles = this.add.group({ runChildUpdate: true });
        this._trigger = this.add.group({ runChildUpdate: true });
    }
    public update(time: number, delta: number): void {
        super.update(time, delta);
        this._cube.update();
    }
    protected tweenBG(): void
    {
        const firstColor = Phaser.Display.Color.ValueToColor(0xf220ff);
        const secondColor = Phaser.Display.Color.ValueToColor(0x0000ff);
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
export default Level2Scene;