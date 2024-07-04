class LevelCompleteScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelComplete' });
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);
        let levelComplete = this.add.image(0, 0, 'levelComplete').setOrigin(0);
        levelComplete.setInteractive();
        levelComplete.on('pointerdown', () => {
            this.scene.start('Menu');
        });
    }
}
export default LevelCompleteScene;