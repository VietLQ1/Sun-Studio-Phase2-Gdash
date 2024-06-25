import PlayerStateMachine from "../state-machine/PlayerStateMachine";

class PlayerBehaviorManager {
    private _stateMachine: PlayerStateMachine;
    private _playerPosition: Phaser.Math.Vector2;
    private constructor() {
        this._stateMachine = new PlayerStateMachine();
        this._playerPosition = new Phaser.Math.Vector2();
        this._playerPosition.set(0, 400);
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
}
export default PlayerBehaviorManager;