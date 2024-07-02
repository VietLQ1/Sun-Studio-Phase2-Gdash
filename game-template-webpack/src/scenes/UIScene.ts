import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";
import GeoDashScene from "./GeoDashScene";

class UIScene extends Phaser.Scene {
    private _pauseBtn: Phaser.GameObjects.Image;
    constructor() {
        super('UI');
    }
    public create(): void {
        this._pauseBtn = this.add.image(this.game.renderer.width, 0, 'pauseBtn').setOrigin(1, 0).setInteractive();
        this._pauseBtn.on('pointerdown', () => {
            let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
            scene.pause();
            this._pauseBtn.setVisible(false);
            this._pauseBtn.disableInteractive();
        });
        this.input.keyboard!.on('keydown-ESC', () => {
            let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
            if (!this._pauseBtn.visible) {
                scene.resume();
                this._pauseBtn.setVisible(true);
                this._pauseBtn.setInteractive();
            }
            else {
                scene.pause();
                this._pauseBtn.setVisible(false);
                this._pauseBtn.disableInteractive();
            }
        });
    }
}
export default UIScene;