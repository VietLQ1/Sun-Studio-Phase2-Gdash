import Phaser from "phaser";
import Level1Scene from "./scenes/Level1Scene";
import MenuScene from "./scenes/MenuScene";
import BootScene from "./scenes/BootScene";
import LoadScene from "./scenes/LoadScene";
import LevelProgressScene from "./scenes/LevelProgressScene";
import Level2Scene from "./scenes/Level2Scene";
import UIScene from "./scenes/UIScene";
import Level3Scene from "./scenes/Level3Scene";
import LevelCompleteScene from "./scenes/LevelCompleteScene";

    const config : Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1536,
        height: 776,
        scene: [BootScene,LoadScene, MenuScene, Level1Scene, Level2Scene, Level3Scene, LevelProgressScene, UIScene, LevelCompleteScene],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {x:0, y: 3050 },
                debug: true
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    };

    const game = new Phaser.Game(config);
    console.log(window.innerWidth);