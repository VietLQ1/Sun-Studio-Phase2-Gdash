import Player from "../game-object/Player";
import PlayerBehaviorManager from "../manager/PlayerBehaviorManager";

class PlayerCubeState implements GeoDash.IPlayerState
{
    public playerRule: GeoDash.IPlayerRule;
    public object: Player;
    constructor(object: Player)
    {
        this.playerRule = {collideBottom: true, collideLeft: false, collideRight: false, collideTop: false};
        this.object = object;
    }
    onEnter: () => void = () =>
    {
        console.log("PlayerCubeState onEnter");
        this.object.setPosition(PlayerBehaviorManager.instance.playerPosition.x, PlayerBehaviorManager.instance.playerPosition.y);
    }
    onExit: () => void = () =>
    {
        console.log("PlayerCubeState onExit");
        PlayerBehaviorManager.instance.playerPosition = new Phaser.Math.Vector2(this.object.x, this.object.y);
    }
    update(): void
    {
        this.object.update();
    }
}
export default PlayerCubeState;