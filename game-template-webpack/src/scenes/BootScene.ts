class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    public preload() {
        //set up loading bar
        this.cameras.main.setBackgroundColor(0x000000);
        //load resources
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('progressBar', 'assets/images/process-bar-front.png');
        this.load.image('progressFill', 'assets/images/process-bar-back.png');

        this.load.once('complete', () => {
            this.scale.setParentSize(window.innerWidth, window.innerHeight);
        });
    }
    public update(time: number, delta: number): void {
        super.update(time, delta);
        this.scene.start('Load');
    }
}
export default BootScene;