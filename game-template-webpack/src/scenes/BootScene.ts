class BootScene extends Phaser.Scene {
    private loadingBar: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;
    constructor() {
        super('Boot');
    }
    public preload() {
        //set up loading bar
        this.cameras.main.setBackgroundColor(0x000000);
        this.createLoadingGraphics();

        // pass value to change the loading bar fill



        //load resources
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('bg', 'assets/images/bg.png');
    }
    public update(time: number, delta: number): void {
        super.update(time, delta);
        this.scene.start('Load');
    }
    private createLoadingGraphics(): void {
    }
}
export default BootScene;