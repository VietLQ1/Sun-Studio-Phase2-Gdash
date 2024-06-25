class PlayerStateMachine
{
    private _currentState: GeoDash.IPlayerState | undefined;
    public get currentState(): GeoDash.IPlayerState
    {
        if (!this._currentState)
        {
            throw new Error("No state set");
        }
        return this._currentState;
    }
    public stateMap: Map<string, GeoDash.IPlayerState>;
    constructor()
    {
        this.stateMap = new Map<string, GeoDash.IPlayerState>();
    }
    public addState(name: string, state: GeoDash.IPlayerState): void
    {
        state.object.setActive(false);
        state.object.setVisible(false);
        this.stateMap.set(name, state);
    }
    public setState(name: string): void
    {
        if (this._currentState)
        {
            this._currentState.onExit();
        }
        this._currentState = this.stateMap.get(name);
        if (!this._currentState)
        {
            throw new Error(`State ${name} does not exist`);
        }
        this._currentState.onEnter();
    }
}
export default PlayerStateMachine;