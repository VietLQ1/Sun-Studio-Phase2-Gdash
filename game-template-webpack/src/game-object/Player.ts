class Player extends Phaser.GameObjects.Sprite {
    speedX: number;
    jumpKey: Phaser.Input.Keyboard.Key;
    

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        // Enable physics on this object
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        // Set player properties
        this.speedX = 240; // Adjust as needed for game speed

        // Initialize jump key
        if (scene.input.keyboard == null)
            throw new Error("scene.input.keyboard is null");
        console.log(scene.input.keyboard);
        this.jumpKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    public update(): void {
        let body = this.body as Phaser.Physics.Arcade.Body;
        console.log(body.blocked.down);
        body.setVelocityX(this.speedX); // Move right at constant speed
        this.jump();
    }
    private jump(): void {
        let body = this.body as Phaser.Physics.Arcade.Body;
        // Jump if the space key is pressed and the player is touching the ground
        if (this.jumpKey.isDown && body.blocked.down) {
            console.log("Jumping");
            body.setVelocityY(-720); // Adjust jump strength as needed
            body.setAngularVelocity(180); // Add some spin to the jump
            body.setAllowRotation(true); // Allow the player to rotate in the air
        }
        else if (body.blocked.down) {
            body.setAngularVelocity(0); // Stop spinning when touching the ground
            body.setAllowRotation(false); // Don't allow the player to rotate on the ground
            this.flatOut();
        }
    }
    private flatOut(): void {
        if (this.angle < 45 && this.angle > -45) {
            // console.log("Flat 0");
            this.angle = 0;
        }
        else if (this.angle >= 45 && this.angle < 135) {
            // console.log("Flat 90");
            this.angle = 90;
        }
        else if (this.angle <= -45 && this.angle > -135) {
            // console.log("Flat -90");
            this.angle = -90;
        }
        else if (this.angle >= 135 || this.angle <= -135) {
            // console.log("Flat 180");
            this.angle = 180;
        }
    }
}
export default Player;