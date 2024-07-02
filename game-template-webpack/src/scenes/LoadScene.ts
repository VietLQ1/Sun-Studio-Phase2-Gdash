class LoadScene extends Phaser.Scene
{
    private loadingBar: Phaser.GameObjects.NineSlice;
    private loadingBarFill: Phaser.GameObjects.NineSlice;
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
        this.load.tilemapTiledJSON('lv2', 'assets/tilemaps/back-on-track.json');
        this.load.image('tiles', 'assets/tilemaps/kenney_redux_64x64.png');
        this.load.audio('StereoMadness', 'assets/sounds/StereoMadness.mp3');
        this.load.audio('BackOnTrack', 'assets/sounds/BackOnTrack.mp3');
        this.load.audio('explode', 'assets/sounds/explode.ogg');
        this.load.image('coin1','assets/images/coin-sheet/secretCoin_01.png');
        this.load.image('coin2','assets/images/coin-sheet/secretCoin_02.png');
        this.load.image('coin3','assets/images/coin-sheet/secretCoin_03.png');
        this.load.image('coin4','assets/images/coin-sheet/secretCoin_04.png');
        this.load.image('lv1Btn', 'assets/images/levels/lv1.png');
        this.load.image('lv2Btn', 'assets/images/levels/lv2.png');
        this.load.image('lv3Btn', 'assets/images/levels/lv3.png');
    }
    public update(time: number, delta: number): void
    {
        super.update(time, delta);
        this.scene.start('Menu');
    }
    private createLoadingGraphics(): void
    {
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(this.game.renderer.width, this.game.renderer.height).setTint(0xfff977).setAlpha(0.75);
        this.add.image(0, 0, 'logo').setOrigin(0, 0).setPosition(this.game.renderer.width / 4, this.game.renderer.height / 4);
        this.loadingBarFill = this.add.nineslice(this.game.renderer.width / 4 + 5, 400, 'progressFill',0, 845).setOrigin(0, 0.5);
        this.loadingBar = this.add.nineslice(this.game.renderer.width / 4, 400, 'progressBar',0, 850).setOrigin(0, 0.5);
    }
    private updateBar(percentage: number): void
    {
        this.loadingBarFill.displayWidth = 845 * percentage;
    }
}
export default LoadScene;