import Player from "../game-object/Player";
import PlayerShip from "../game-object/PlayerShip";
import PlayerCubeState from "../state-machine/PlayerCubeState";
import PlayerShipState from "../state-machine/PlayerShipState";
import PlayerStateMachine from "../state-machine/PlayerStateMachine";

class PlayerBehaviorManager {
    private _stateMachine: PlayerStateMachine;
    private _playerPosition: Phaser.Math.Vector2;
    public currentScene: Phaser.Scene;
    private constructor() {
        this._stateMachine = new PlayerStateMachine();
        this._playerPosition = new Phaser.Math.Vector2();
    }
    public init(scene: Phaser.Scene): void {
        this.currentScene = scene;
        this._playerPosition.set(0, 400);
        this._stateMachine.addState("cube", new PlayerCubeState(new Player(scene, 0, 400, "cube")));
        this._stateMachine.addState("ship", new PlayerShipState(new PlayerShip(scene, 0, 400)));
        this._stateMachine.setState("cube");
    }
    private static _instance: PlayerBehaviorManager;
    public static get instance(): PlayerBehaviorManager {
        if (!PlayerBehaviorManager._instance) {
            PlayerBehaviorManager._instance = new PlayerBehaviorManager();
        }
        return PlayerBehaviorManager._instance;
    }
    public get playerPosition(): Phaser.Math.Vector2 {
        return this._playerPosition;
    }
    public set playerPosition(value: Phaser.Math.Vector2) {
        this._playerPosition = value;
    }
    public update(): void {
        this._stateMachine.currentState.update();
    }
    public get stateMachine(): PlayerStateMachine {
        return this._stateMachine;
    }
}
export default PlayerBehaviorManager;