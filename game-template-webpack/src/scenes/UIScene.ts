import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";

class UIScene extends Phaser.Scene {
    private _pauseBtn: Phaser.GameObjects.Image;
    constructor() {
        super('UI');
    }
    public create(): void {
        this._pauseBtn = this.add.image(this.game.renderer.width, 0, 'pauseBtn').setOrigin(1, 0).setInteractive();
        this._pauseBtn.on('pointerdown', () => {
            PlayerBehaviorManager.instance.currentScene.scene.pause();
        });
    }
}