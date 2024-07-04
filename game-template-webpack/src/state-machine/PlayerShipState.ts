import PlayerShip from "../game-object/PlayerShip";
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";

class PlayerShipState implements GeoDash.IPlayerState
{
    public playerRule: GeoDash.IPlayerRule;
    public object: PlayerShip;
    constructor(object: PlayerShip)
    {
        this.playerRule = {collideBottom: true, collideLeft: false, collideRight: false, collideTop: true};
        this.object = object;
    }
    public onEnter: () => void = () =>
    {
        this.object.scene.cameras.main.zoomTo(0.75, 1000);
        let body = this.object.body as Phaser.Physics.Arcade.Body;
        console.log("PlayerShipState onEnter");
        this.object.setActive(true);
        this.object.setVisible(true);
        this.object.setPosition(PlayerBehaviorManager.instance.playerPosition.x, PlayerBehaviorManager.instance.playerPosition.y);
        body.setVelocityY(0);
        
    }
    public onExit: () => void = () =>
    {
        this.object.scene.cameras.main.zoomTo(1, 1000);
        console.log("PlayerShipState onExit");
        //PlayerBehaviorManager.instance.playerPosition = new Phaser.Math.Vector2(this.object.x, this.object.y);
        this.object.setActive(false);
        this.object.setVisible(false);
        let body = this.object.body as Phaser.Physics.Arcade.Body;
        body.setVelocityX(0);
    }
    public update(): void
    {
        this.object.update();
        PlayerBehaviorManager.instance.playerPosition.x = this.object.x;
        PlayerBehaviorManager.instance.playerPosition.y = this.object.y;
    }
}
export default PlayerShipState;