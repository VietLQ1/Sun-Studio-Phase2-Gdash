import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";
import GeoDashScene from "./GeoDashScene";

class UIScene extends Phaser.Scene {
    private _pauseBtn: Phaser.GameObjects.Image;
    private _resumeBtn: Phaser.GameObjects.Image;
    private _menuBtn: Phaser.GameObjects.Image;
    constructor() {
        super('UI');
    }
    public create(): void {
        this._pauseBtn = this.add.image(this.game.renderer.width, 0, 'pauseBtn').setOrigin(1, 0).setInteractive();
        this._pauseBtn.on('pointerover', () => {
            this._pauseBtn.setAlpha(0.85);
        });
        this._pauseBtn.on('pointerout', () => {
            this._pauseBtn.setAlpha(1);
        });
        this._pauseBtn.on('pointerdown', () => {
            let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
            scene.pause();
            this._pauseBtn.setVisible(false);
            this._pauseBtn.disableInteractive();
            this._resumeBtn.setVisible(true).setInteractive();
            this._menuBtn.setVisible(true).setInteractive();
        });

        this.input.keyboard!.on('keydown-ESC', () => {
            let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
            if (!this._pauseBtn.visible) {
                scene.resume();
                this._pauseBtn.setVisible(true);
                this._pauseBtn.setInteractive();
                this._resumeBtn.setVisible(false).disableInteractive();
                this._menuBtn.setVisible(false).disableInteractive();
            }
            else {
                scene.pause();
                this._pauseBtn.setVisible(false);
                this._pauseBtn.disableInteractive();
                this._resumeBtn.setVisible(true).setInteractive();
                this._menuBtn.setVisible(true).setInteractive();
            }
        });

        this._resumeBtn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'resumeBtn').setOrigin(0.5, 0.5).setVisible(false).disableInteractive();
        this._resumeBtn.on('pointerover', () => {
            this._resumeBtn.setAlpha(0.85);
        });
        this._resumeBtn.on('pointerout', () => {
            this._resumeBtn.setAlpha(1);
        });
        this._resumeBtn.on('pointerdown', () => {
            let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
            scene.resume();
            this._resumeBtn.setVisible(false).disableInteractive();
            this._menuBtn.setVisible(false).disableInteractive();
            this._pauseBtn.setVisible(true).setInteractive();
        });

        this._menuBtn = this.add.image(this.game.renderer.width / 2 + 200, this.game.renderer.height / 2, 'menuBtn').setOrigin(0.5, 0.5).setVisible(false).disableInteractive();
        this._menuBtn.on('pointerover', () => {
            this._menuBtn.setAlpha(0.85);
        });
        this._menuBtn.on('pointerout', () => {
            this._menuBtn.setAlpha(1);
        });
        this._menuBtn.on('pointerdown', () => {
            let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
            scene.stop();
            scene.scene.start('Menu');
        });
    }
}
export default UIScene;