import JumpPad from "./JumpPad";

class GravityPad extends JumpPad
{
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height, 0);
    }
    protected init() {
        this.setOrigin(0, 0);
        let body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);
        body.setSize(this.width, this.height);
        body.setOffset(0, 0);
        this.scene.add.image(this.x, this.y, 'gravBump').setDisplaySize(this.width, this.height).setDisplayOrigin(0, 0);
        let particle = this.scene.add.particles(this.x + this.width/2, this.y, 'particle',
            {
                color: [ 0x0000ff, 0x0000ff],
                colorEase: 'quart.out',
                lifespan: 100,
                angle: { min: -100, max: -80 },
                scale: { start: 2, end: 0, ease: 'sine.in' },
                speed: { min: 250, max: 350 },
                advance: 50,
                frequency: 150,
                blendMode: 'ADD'
            }
        );
    }
}
export default GravityPad;