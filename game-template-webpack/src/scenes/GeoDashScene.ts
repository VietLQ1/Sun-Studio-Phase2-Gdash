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
    constructor (config: string | Phaser.Types.Scenes.SettingsConfig)
    {
        super(config);
    }
}
export default GeoDashScene;