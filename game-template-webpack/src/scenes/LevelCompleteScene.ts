class LevelCompleteScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelComplete' });
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width * 0.5, height * 0.5, 'Level Complete', {
            fontSize: '48px',
            color: '#ffffff',
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('Menu');
        });
    }
}
export default LevelCompleteScene;