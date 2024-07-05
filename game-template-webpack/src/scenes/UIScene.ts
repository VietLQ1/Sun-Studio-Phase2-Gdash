import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";
import GeoDashScene from "./GeoDashScene";

class UIScene extends Phaser.Scene {
    private _pauseBtn: Phaser.GameObjects.Image;
    private _resumeBtn: Phaser.GameObjects.Image;
    private _menuBtn: Phaser.GameObjects.Image;
    private _restartBtn: Phaser.GameObjects.Image;
    private _pauseBG: Phaser.GameObjects.Graphics;
    constructor() {
        super('UI');
    }
    public create(): void {
        this._pauseBG = this.add.graphics(
            {
                fillStyle: {
                    color: 0xffffff,
                    alpha: 0.35
                }
            }
        ).fillRoundedRect(0, 0, this.game.renderer.width, this.game.renderer.height, 20).setVisible(false);
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
            this._pauseBG.setVisible(true);
            this._resumeBtn.setVisible(true).setInteractive();
            this._menuBtn.setVisible(true).setInteractive();
            this._restartBtn.setVisible(true).setInteractive();
        });

        this.input.keyboard!.on('keydown-ESC', () => {
            let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
            if (!this._pauseBtn.visible) {
                scene.resume();
                this._pauseBtn.setVisible(true);
                this._pauseBtn.setInteractive();
                this._pauseBG.setVisible(false);
                this._resumeBtn.setVisible(false).disableInteractive();
                this._menuBtn.setVisible(false).disableInteractive();
                this._restartBtn.setVisible(false).disableInteractive();
            }
            else {
                scene.pause();
                this._pauseBtn.setVisible(false);
                this._pauseBtn.disableInteractive();
                this._pauseBG.setVisible(true);
                this._resumeBtn.setVisible(true).setInteractive();
                this._menuBtn.setVisible(true).setInteractive();
                this._restartBtn.setVisible(true).setInteractive();
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
            this._pauseBG.setVisible(false);
            this._resumeBtn.setVisible(false).disableInteractive();
            this._menuBtn.setVisible(false).disableInteractive();
            this._pauseBtn.setVisible(true).setInteractive();
            this._restartBtn.setVisible(false).disableInteractive();
        });

        this._menuBtn = this.add.image(this.game.renderer.width / 2 + 200, this.game.renderer.height / 2, 'menuBtn').setOrigin(0.5, 0.5).setVisible(false).disableInteractive();
        this._menuBtn.on('pointerover', () => {
            this._menuBtn.setAlpha(0.85);
        });
        this._menuBtn.on('pointerout', () => {
            this._menuBtn.setAlpha(1);
        });
        this._menuBtn.on('pointerdown', () => {
            this.scene.stop('LevelProgress');
            let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
            const fx = this.cameras.main.postFX.addWipe();
            this.scene.transition({
                target: 'Menu',
                duration: 500,
                moveBelow: true,
                onUpdate: (progress: number) => {
                    fx.progress = progress;
                }
            });
            this.time.delayedCall(500, () => {
                scene.scene.stop();
            }, [], this);
        });

        this._restartBtn = this.add.image(this.game.renderer.width / 2 - 200, this.game.renderer.height / 2, 'restartBtn').setOrigin(0.5, 0.5).setVisible(false).disableInteractive();
        this._restartBtn.on('pointerover', () => {
            this._restartBtn.setAlpha(0.85);
        });
        this._restartBtn.on('pointerout', () => {
            this._restartBtn.setAlpha(1);
        });
        this._restartBtn.on('pointerdown', () => {
            let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
            scene.scene.restart();
            this._pauseBtn.setVisible(true).setInteractive();
            this._pauseBG.setVisible(false);
            this._resumeBtn.setVisible(false).disableInteractive();
            this._menuBtn.setVisible(false).disableInteractive();
            this._restartBtn.setVisible(false).disableInteractive();
        });
    }
}
export default UIScene;