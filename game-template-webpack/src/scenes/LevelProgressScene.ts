
import LevelProgressManager from "../manager/LevelProgressManager";
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";
import GeoDashScene from "./GeoDashScene";

class LevelProgressScene extends Phaser.Scene {
    public static newBest: boolean = false;
    private _levelProgress: number = 0;
    private _progressBar: Phaser.GameObjects.NineSlice;
    private _progressFill: Phaser.GameObjects.NineSlice;
    private _progressText: Phaser.GameObjects.Text;
    private _coinText: Phaser.GameObjects.Text;
    private _levelAttemptsText: Phaser.GameObjects.Text;
    constructor() {
        super({ key: 'LevelProgress' });
    }

    public create() {
        this._progressFill = this.add.nineslice(this.game.renderer.width / 4 + 5, 25, 'progressFill', 0, 845).setOrigin(0, 0.5);
        this._progressBar = this.add.nineslice(this.game.renderer.width / 4, 25, 'progressBar', 0, 850).setOrigin(0, 0.5);
        this._progressText = this.add.text(this.game.renderer.width / 4 + 900, 25, '0%', { fontSize: '50px', color: '#FFD700' }).setOrigin(0, 0.5);
        this._coinText = this.add.text(0, 0, 'Coins: 0', { fontSize: '50px', color: '#FFD700' }).setOrigin(0, 0);
        let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
        this._levelAttemptsText = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 
            'Attempts: ' + LevelProgressManager.getInstance().getLevelProgress(scene.scene.key + 'attempts').toString(), { fontSize: '50px', color: '#FFD700' }).setOrigin(0.5, 0.5);
        this.time.delayedCall(750, () => {
            this._levelAttemptsText.setVisible(false);
        });
    }
    public update(time: number, delta: number): void {
        super.update(time, delta);
        let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
        this._levelProgress = scene.cube.body?.position.x! / scene.map.widthInPixels;
        this._progressFill.displayWidth = 845 * this._levelProgress;
        this._progressText.setText(Math.round(this._levelProgress * 100).toString() + '%');
        if (this._levelProgress > LevelProgressManager.getInstance().getLevelProgress(scene.scene.key))
        {
            //console.log('New Best');
            LevelProgressManager.getInstance().setLevelProgress(scene.scene.key,this._levelProgress);
            LevelProgressScene.newBest = true;
        }
        else if (this._levelProgress < LevelProgressManager.getInstance().getLevelProgress(scene.scene.key))
        {
            LevelProgressScene.newBest = false;
            //console.log('Not New Best');
        }
        this._coinText.setText('Coins: ' + LevelProgressManager.getInstance().getLevelProgress(scene.scene.key + 'coins'));
    }
}
export default LevelProgressScene;