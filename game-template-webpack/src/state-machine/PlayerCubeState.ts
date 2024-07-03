import Player from "../game-object/Player";
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";

class PlayerCubeState implements GeoDash.IPlayerState
{
    public playerRule: GeoDash.IPlayerRule;
    public object: Player;
    constructor(object: Player)
    {
        this.playerRule = {collideBottom: true, collideLeft: true, collideRight: false, collideTop: false};
        this.object = object; 
    }
    public onEnter: () => void = () =>
    {
        console.log("PlayerCubeState onEnter");
        this.object.setPosition(PlayerBehaviorManager.instance.playerPosition.x, PlayerBehaviorManager.instance.playerPosition.y);
        this.object.setActive(true);
        this.object.setVisible(true);
    }
    public onExit: () => void = () =>
    {
        console.log(this.object.x, this.object.y)
        console.log("PlayerCubeState onExit");
        PlayerBehaviorManager.instance.playerPosition = new Phaser.Math.Vector2(this.object.x, this.object.y);
        this.object.setActive(false);
        this.object.setVisible(false);
        let body = this.object.body as Phaser.Physics.Arcade.Body;
        // if (!body)
        // {
        //     console.log("PlayerCubeState body is null");
        //     return;
        // }
        body.setVelocityX(0);
    }
    public update(): void
    {
        this.object.update();
        PlayerBehaviorManager.instance.playerPosition = new Phaser.Math.Vector2(this.object.x, this.object.y);
    }
}
export default PlayerCubeState;