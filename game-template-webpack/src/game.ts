import Phaser from "phaser";
import Level1Scene from "./scenes/Level1Scene";

    const config : Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: 600,
        scene: Level1Scene,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {x:0, y: 980 },
                debug: true
            }
        }
    };

    const game = new Phaser.Game(config);