import LevelProgressManager from "../manager/LevelProgressManager";

class MenuScene extends Phaser.Scene {
    private _playBtn: Phaser.GameObjects.Image;
    private _lv1Btn: Phaser.GameObjects.Image;
    private _lv2Btn: Phaser.GameObjects.Image;
    private _lv3Btn: Phaser.GameObjects.Image;
    private _menuLoop: Phaser.Sound.WebAudioSound;
    constructor() {
        super('Menu');
    }
    public preload() {
    }
    public create() {
        if (this.sound.locked) {
            this.sound.once('unlocked', () => {
                this._menuLoop = this.sound.add('menuLoop', { loop: true }) as Phaser.Sound.WebAudioSound;
                this._menuLoop.play();
            });
        }
        else {
            this._menuLoop = this.sound.add('menuLoop', { loop: true }) as Phaser.Sound.WebAudioSound;
            this._menuLoop.play();
        }
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(this.game.renderer.width, this.game.renderer.height).setTint(0x0000ff).setAlpha(0.75);
        let lv1Text = this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height / 2 + 200, 'Stereo Madness'
            + '\n' + Math.round(LevelProgressManager.getInstance().getLevelProgress('Level1') * 100).toString() + '%',
            { fontSize: '30px', color: '#FF0000', fontStyle: 'bold' }).setOrigin(0.5, 0.5).setVisible(false);
        let lv2Text = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, 'Back On Track'
            + '\n' + Math.round(LevelProgressManager.getInstance().getLevelProgress('Level2') * 100).toString() + '%',
            { fontSize: '30px', color: '#FF0000', fontStyle: 'bold' }).setOrigin(0.5, 0.5).setVisible(false);
        let lv3Text = this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height / 2 + 200, 'Polargeist'
            + '\n' + Math.round(LevelProgressManager.getInstance().getLevelProgress('Level3') * 100).toString() + '%',
            { fontSize: '30px', color: '#FF0000', fontStyle: 'bold' }).setOrigin(0.5, 0.5).setVisible(false);
        this._playBtn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'playBtn').setInteractive();
        let pressing = false;
        this._playBtn.on('pointerover', () => {
            this._playBtn.setAlpha(0.85);
        });
        this._playBtn.on('pointerout', () => {
            this._playBtn.setAlpha(1);
        });
        this._playBtn.on('pointerdown', () => {
            pressing = true;
            this._playBtn.setTint(0xfff000);
        });
        this._playBtn.on('pointerup', () => {
            if (pressing) {
                pressing = false;
                this._lv1Btn.setVisible(true).setInteractive();
                this._lv2Btn.setVisible(true).setInteractive();
                this._lv3Btn.setVisible(true).setInteractive();
                this._playBtn.setVisible(false).disableInteractive();
                lv1Text.setVisible(true);
                lv2Text.setVisible(true);
                lv3Text.setVisible(true);
            }
        });

        this._lv1Btn = this.add.image(this.game.renderer.width / 2 - 300, this.game.renderer.height / 2 + 100, 'lv1Btn').setVisible(false).disableInteractive();
        this._lv1Btn.on('pointerover', () => {
            this._lv1Btn.setAlpha(0.85);
        });
        this._lv1Btn.on('pointerout', () => {
            this._lv1Btn.setAlpha(1);
        });
        this._lv1Btn.on('pointerdown', () => {
            this._menuLoop.stopAndRemoveBufferSource();
            this.scene.start('Level1');
        });

        this._lv2Btn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'lv2Btn').setVisible(false).disableInteractive();
        this._lv2Btn.on('pointerover', () => {
            this._lv2Btn.setAlpha(0.85);
        });
        this._lv2Btn.on('pointerout', () => {
            this._lv2Btn.setAlpha(1);
        });
        this._lv2Btn.on('pointerdown', () => {
            this._menuLoop.stopAndRemoveBufferSource();
            this.scene.start('Level2');
        });

        this._lv3Btn = this.add.image(this.game.renderer.width / 2 + 300, this.game.renderer.height / 2 + 100, 'lv3Btn').setVisible(false).disableInteractive();
        this._lv3Btn.on('pointerover', () => {
            this._lv3Btn.setAlpha(0.85);
        });
        this._lv3Btn.on('pointerout', () => {
            this._lv3Btn.setAlpha(1);
        });
        this._lv3Btn.on('pointerdown', () => {
            this._menuLoop.stopAndRemoveBufferSource();
            this.scene.start('Level3');
        });
    }
}
export default MenuScene;