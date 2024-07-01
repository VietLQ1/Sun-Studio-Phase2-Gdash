
import LevelProgressManager from "../manager/LevelProgressManager";
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";
import GeoDashScene from "./GeoDashScene";

class LevelProgress extends Phaser.Scene {
    private _levelProgress: number = 0;
    private _progressBar: Phaser.GameObjects.NineSlice;
    private _progressFill: Phaser.GameObjects.NineSlice;
    constructor() {
        super({ key: 'LevelProgress' });
    }

    public create() {
        this._progressFill = this.add.nineslice(this.game.renderer.width / 4 + 5, 25, 'progressFill', 0, 845).setOrigin(0, 0.5);
        this._progressBar = this.add.nineslice(this.game.renderer.width / 4, 25, 'progressBar', 0, 850).setOrigin(0, 0.5);
    }
    public update(time: number, delta: number): void {
        super.update(time, delta);
        let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
        this._levelProgress = scene.cube.body?.position.x! / scene.map.widthInPixels;
        this._progressFill.displayWidth = 845 * this._levelProgress;
        if (this._levelProgress > LevelProgressManager.getInstance().getLevelProgress(scene.scene.key))
            LevelProgressManager.getInstance().setLevelProgress(scene.scene.key,this._levelProgress);
    }
}
export default LevelProgress;