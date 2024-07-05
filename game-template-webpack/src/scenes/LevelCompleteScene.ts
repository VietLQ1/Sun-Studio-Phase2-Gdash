import LevelProgressManager from "../manager/LevelProgressManager";
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";
import GeoDashScene from "./GeoDashScene";

class LevelCompleteScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelComplete' });
    }
    public preload() {
        this.load.image('levelComplete', 'assets/images/levelComplete.png');
    }
    public create() {
        //this.cameras.main.setBackgroundColor(0x000000);
        this.add.graphics(  {
            fillStyle: {
                color: 0x000000,
                alpha: 0.75
            }
        }).fillRect(0, 0, this.game.renderer.width, this.game.renderer.height);
        this.add.image(this.game.renderer.width/2, this.game.renderer.height/2 - 100, 'levelComplete').setOrigin(0.5, 0.5);
        this.add.text(this.game.renderer.width/2, this.game.renderer.height/2, 'Coins: ' +
        LevelProgressManager.getInstance().getLevelProgress(PlayerBehaviorManager.instance.currentScene.scene.key + 'coins').toString() + '/3', 
        { fontSize: '80px', color: '#FFD700', fontStyle: 'bold' }).setOrigin(0.5, 0.5);
        this.add.text(this.game.renderer.width/2, this.game.renderer.height/2 + 200, 'Attempts: ' +
        LevelProgressManager.getInstance().getLevelProgress(PlayerBehaviorManager.instance.currentScene.scene.key + 'attempts').toString(), 
        { fontSize: '80px', color: '#FFD700', fontStyle: 'bold' }).setOrigin(0.5, 0.5);
        let menuBtn = this.add.image(this.game.renderer.width/2 - 200, this.game.renderer.height/2 + 100, 'menuBtn').setOrigin(0.5, 0.5).setInteractive();
        menuBtn.on('pointerover', () => {
            menuBtn.setAlpha(0.85);
        });
        menuBtn.on('pointerout', () => {
            menuBtn.setAlpha(1);
        });
        menuBtn.on('pointerdown', () => {
            const fx = this.cameras.main.postFX.addWipe(0.3, 1, 1);
            this.scene.transition({
                target: 'Menu',
                duration: 500,
                moveBelow: true,
                onUpdate: (progress: number) => {
                    fx.progress = progress;
                }
            });
        });

        let restartBtn = this.add.image(this.game.renderer.width/2 + 200, this.game.renderer.height/2 + 100, 'restartBtn').setOrigin(0.5, 0.5).setInteractive();
        restartBtn.on('pointerover', () => {
            restartBtn.setAlpha(0.85);
        });
        restartBtn.on('pointerout', () => {
            restartBtn.setAlpha(1);
        });
        restartBtn.on('pointerdown', () => {
            let scene = PlayerBehaviorManager.instance.currentScene as GeoDashScene;
            LevelProgressManager.getInstance().resetLevelProgress(scene.scene.key + 'attempts');
            scene.scene.restart();
            this.scene.start('UI');
        });
    }
}
export default LevelCompleteScene;