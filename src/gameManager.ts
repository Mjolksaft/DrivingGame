import { GameScene, MainScene, PauseScene } from "./scene";

export type GameState = 'menu' | 'playing' | 'paused' | 'finished';

export class GameManager {
    // takes care of game related tasks like game states, score, pause, etc...
    public state: GameState = 'playing';
    score: number = 0;
    public mainScene: MainScene = new MainScene(this);
    public gameScene: GameScene = new GameScene(this);
    public pauseScene: PauseScene = new PauseScene(this);


    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    update(): void {
        switch (this.state) {
            case 'menu':
                this.mainScene.handleInput();
                this.mainScene.update();
                this.mainScene.draw(this.ctx);
                break;

            case 'finished':

                break;

            case 'paused':
                this.pauseScene.handleInput();
                this.pauseScene.update();

                // draw the game then the puase screen
                this.gameScene.draw(this.ctx);
                this.pauseScene.draw(this.ctx);



                break;

            case 'playing':
                this.gameScene.handleInput();
                this.gameScene.update();
                this.gameScene.draw(this.ctx);


                break;
        }
    }

    swapScene(newState: GameState): void {
        this.state = newState;
        switch (this.state) {
            case 'menu':
                this.mainScene.onEnter();
                break;

            case 'finished':

                break;

            case 'paused':
                this.pauseScene.onEnter();

                break;

            case 'playing':
                this.gameScene.onEnter();
                break;
        }
    }

    pauseGame(): void {
        this.gameScene.playerController.pauseGame();
    }
}