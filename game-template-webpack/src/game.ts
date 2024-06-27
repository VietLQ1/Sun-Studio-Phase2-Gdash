import Phaser from "phaser";
import Level1Scene from "./scenes/Level1Scene";
import MenuScene from "./scenes/MenuScene";

    const config : Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: Math.min(window.innerHeight, 900),
        scene: [MenuScene, Level1Scene],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {x:0, y: 3000 },
                debug: true
            }
        }
    };

    const game = new Phaser.Game(config);