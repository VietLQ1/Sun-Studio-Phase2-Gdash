import InputHandler from "../input/InputHandler";
import GeoDashScene from "../scenes/GeoDashScene";

class PlayerShip extends Phaser.GameObjects.Container implements GeoDash.IObserver
{
    public speedX: number;
    //jumpKey: Phaser.Input.Keyboard.Key;
    private _flying: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y);
        // Create the player sprite
        this.add([scene.add.sprite(32, 18, 'cube').setScale(0.75,0.75), scene.add.sprite(32, 40, 'ship')]);
        this.getAll().forEach((child) => {
            if (child instanceof Phaser.GameObjects.Sprite)
            {
                child.setTint(Math.random() * 0xffffff);
                
            }
        
        });
        scene.add.existing(this);
        // Enable physics on this object
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);
        // Set player properties
        this.speedX = 395; // Adjust as needed for game speed
        // Initialize jump key
        if (scene.input.keyboard == null)
            throw new Error("scene.input.keyboard is null");
        if (scene instanceof GeoDashScene)
        {
            scene.inputHandler.attach(this);
        }
        let body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(57, 57);
        body.setMaxVelocityY(1000);
        //this.jumpKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    public onNotify(subject: GeoDash.ISubject): void
    {
        // console.log("Player notified");
        if (subject instanceof InputHandler)
        {
            // console.log("InputHandler instance");
            if (subject.jumpKey.isDown || subject.pointer.isDown)
            {
                this._flying = true;
            }
            else
            {
                this._flying = false;
            }
        }
    }
    public update(): void
    {
        let body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocityX(this.speedX); // Move right at constant speed
        this.fly();
    }
    private fly(): void
    {
        let body = this.body as Phaser.Physics.Arcade.Body;
        // Jump if the space key is pressed and the player is touching the ground
        if (this._flying)//this.jumpKey.isDown)
        {
            body.setVelocityY(-500); // Adjust jump strength as needed
            body.setAllowRotation(true); // Allow the player to rotate in the air
        }
        else if (body.blocked.down)
        {
            body.setAllowRotation(false); // Don't allow the player to rotate on the ground
        }
        this.flatOut();
    }
    private flatOut(): void
    {
        if (this.body == null)
        {
            throw new Error("this.body is null");
        
        }
        let body = this.body as Phaser.Physics.Arcade.Body;
        if (body.blocked.up)
        {
            this.angle = 0;
            return;
        }
        let angleRadians = Math.atan2(this.body.velocity.y/10, this.body.velocity.x);
        // Convert radians to degrees
        let angleDegrees = Phaser.Math.RadToDeg(angleRadians);
        this.angle = angleDegrees;
        
    }
}
export default PlayerShip;