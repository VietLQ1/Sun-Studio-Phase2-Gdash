class MenuScene extends Phaser.Scene {
    constructor() {
        super('Menu');
    }
    public preload() {
    }
    public create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(this.game.renderer.width, this.game.renderer.height).setTint(0x0000ff).setAlpha(0.75);
        let playBtn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'playBtn').setInteractive();
        let pressing = false;
        playBtn.on('pointerover', () => {
            playBtn.setAlpha(0.85);
        });
        playBtn.on('pointerout', () => {
            playBtn.setAlpha(1);
        });
        playBtn.on('pointerdown', () => {
            pressing = true;
            playBtn.setTint(0xfff000);
        });
        playBtn.on('pointerup', () => {
            if (pressing) {
                this.scene.start('Level1');
                pressing = false;
            }
        });
    }
}
export default MenuScene;