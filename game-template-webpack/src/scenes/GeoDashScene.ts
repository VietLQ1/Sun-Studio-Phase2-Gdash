import InputHandler from "../input/InputHandler";

class GeoDashScene extends Phaser.Scene
{
    protected _cube : Phaser.GameObjects.Sprite | Phaser.GameObjects.Container;
    protected _spikes : Phaser.GameObjects.Group;
    protected _collectibles : Phaser.GameObjects.Group;
    protected _portal : Phaser.GameObjects.Sprite;
    protected _trigger : Phaser.GameObjects.Sprite;
    public map : Phaser.Tilemaps.Tilemap;
    public tiles : Phaser.Tilemaps.Tileset | null;
    public layer : Phaser.Tilemaps.TilemapLayer | null;
    public bg : Phaser.Tilemaps.TilemapLayer | null;
    public inputHandler : InputHandler;
    constructor (config: string | Phaser.Types.Scenes.SettingsConfig)
    {
        super(config);
    }
    public create(): void
    {
        this.inputHandler = new InputHandler(this);
    }
}
export default GeoDashScene;