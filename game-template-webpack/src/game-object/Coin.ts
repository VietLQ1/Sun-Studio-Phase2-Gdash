class Coin extends Phaser.GameObjects.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 'coin1');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.init();
        this.play('spin');
    }
    private init(): void
    {
        let body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);
        //body.setSize(this.width, this.height);
        this.anims.create({
            key: 'spin',
            frames: [
                { key: 'coin1' },
                { key: 'coin2' },
                { key: 'coin3' },
                { key: 'coin4' }
            ],
            frameRate: 8,
            repeat: -1
        });
    }
    public update(): void
    {
        // Do nothing
    }
}
export default Coin;