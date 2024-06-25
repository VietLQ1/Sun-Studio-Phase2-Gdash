declare namespace GeoDash
{
    interface IPlayerRule
    {
        collideLeft: boolean;
        collideRight: boolean;
        collideTop: boolean;
        collideBottom: boolean;
    }
    interface IPlayerState
    {
        object: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container;
        onEnter: () => void;
        onExit: () => void;
        update(): void;
    }
}