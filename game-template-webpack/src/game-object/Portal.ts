class Portal extends Phaser.GameObjects.Zone{
    public nextState: string;
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, nextState: string)
    {
        super(scene, x, y, width, height);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.nextState = nextState;
        this.init();
    }
    private init(): void
    {
        this.setOrigin(0, 0);
        let body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.setSize(this.width, this.height);
        body.setOffset(0, 0);
    }
    public update(): void
    {
        // Do nothing
    }
}
export default Portal;