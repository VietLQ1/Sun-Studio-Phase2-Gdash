class JumpPad extends Phaser.GameObjects.Zone {
    public jumpForce: number;
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, jumpForce : number) {
        super(scene, x, y, width, height);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.jumpForce = jumpForce;
        this.init();
    }
    private init() {
        this.setOrigin(0, 0);
        let body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.setSize(this.width, this.height);
        body.setOffset(0, 0);
    }
    update() {
        // Do nothing
    }
}
export default JumpPad;