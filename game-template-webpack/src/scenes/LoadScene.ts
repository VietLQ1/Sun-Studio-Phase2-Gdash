class LoadScene extends Phaser.Scene
{
    private loadingBar: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;
    constructor()
    {
        super('Load');
    }
    public preload()
    {
        //set up loading bar
        this.cameras.main.setBackgroundColor(0x000000);
        this.createLoadingGraphics();
        // pass value to change the loading bar fill
        this.load.on('progress', this.updateBar, this);
        //load resources
        this.load.image('playBtn', 'assets/images/playBtn.png');
        this.load.image('cube', 'assets/images/player.png');
        this.load.image('ship', 'assets/images/ship.png');
        this.load.image('particle', 'assets/images/particle_001.png')
        this.load.tilemapTiledJSON('lv1', 'assets/tilemaps/stereo-madness.json');
        this.load.image('tiles', 'assets/tilemaps/kenney_redux_64x64.png');
        this.load.audio('StereoMadness', 'assets/sounds/StereoMadness.mp3');
        this.load.audio('explode', 'assets/sounds/explode.ogg');
    }
    public update(time: number, delta: number): void
    {
        super.update(time, delta);
        this.scene.start('Menu');
    }
    private createLoadingGraphics(): void
    {
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(this.game.renderer.width, this.game.renderer.height).setTint(0xfff977).setAlpha(0.75);
        this.add.image(0, 0, 'logo').setOrigin(0, 0).setDisplaySize(this.game.renderer.width / 2, this.game.renderer.height / 2).setPosition(this.game.renderer.width / 4, this.game.renderer.height / 4);
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0x5E5E5E, 1);
        this.loadingBar.fillRect(100, 200, 1200, 20);
        this.progressBar = this.add.graphics();
    }
    private updateBar(percentage: number): void
    {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xFFFFFF, 1);
        this.progressBar.fillRect(100, 200, percentage * 1200, 20);
    }
}
export default LoadScene;