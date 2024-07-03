class JumpOrb extends Phaser.GameObjects.Zone {
    public jumpForce: number;
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, jumpForce : number) {
        super(scene, x, y, width, height);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        this.jumpForce = jumpForce;
        this.init();
    }
    protected init() {
        this.setOrigin(0, 0);
        let body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.setSize(this.width, this.height);
        body.setOffset(0, 0);
        this.scene.add.image(this.x, this.y, 'ring').setDisplaySize(this.width, this.height).setDisplayOrigin(0, 0);
        let particle = this.scene.add.particles(this.x + this.width/2, this.y + this.height/2, 'particle',
            {
                color: [ 0xffd700, 0xffff1c],
                colorEase: 'quart.out',
                lifespan: 100,
                scale: { start: 0, end: 2, ease: 'sine.in' },
                speed: { min: 250, max: 350 },
                advance: 50,
                frequency: 10,
                blendMode: 'ADD'
            }
        );
    }
    public update() {
        // Do nothing
    }
}
export default JumpOrb;