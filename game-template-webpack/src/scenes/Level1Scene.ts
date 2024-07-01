
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
        this.createLevelMap();
        this.initailize();
        this.loadObjectsFromTilemap();
        this.physics.add.collider(this._cube, this.layer!, this.handleMapCollision, undefined, this);
        this.physics.add.collider(this._spikes, this.layer!);
        this.physics.add.collider(this._cube, this._spikes,this.handleCubeSpikeCollision, undefined, this);
        this.physics.add.overlap(this._cube, this._portal, this.overlapPortal, undefined, this);
    }
    
    public update(time: number, delta: number): void {
        super.update(time, delta);
        this._cube.update();
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