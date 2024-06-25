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
    onEnter: () => void = () =>
    {
        console.log("PlayerCubeState onEnter");
        this.object.setPosition(PlayerBehaviorManager.instance.playerPosition.x, PlayerBehaviorManager.instance.playerPosition.y);
        this.object.setActive(true);
        this.object.setVisible(true);
    }
    onExit: () => void = () =>
    {
        console.log("PlayerCubeState onExit");
        PlayerBehaviorManager.instance.playerPosition = new Phaser.Math.Vector2(this.object.x, this.object.y);
        this.object.setActive(false);
        this.object.setVisible(false);
        let body = this.object.body as Phaser.Physics.Arcade.Body;
        body.setVelocityX(0);
    }
    update(): void
    {
        this.object.update();
    }
}
export default PlayerCubeState;