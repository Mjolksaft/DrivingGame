import { Vector2 } from "three";
import { Button } from "../util/button";
import { GameManager } from "./gameManager";
import { Car } from "../player/car";
import { PlayerController } from "../player/playerController";
import { RoadManager } from "../road/roadManager";

export abstract class Scene {

    abstract update(): void; // for updating what is needed
    abstract draw(ctx: CanvasRenderingContext2D): void; // for drawing what is needed

    onEnter?(): void; // animations ? 
    onExist?(): void; // animations ? 

    handleInput?(): void; // handle things liek buttons and stuff ?

}

export class MainScene extends Scene {
    private gameManager: GameManager;
    private gameButton: Button;

    constructor(gameManager: GameManager) {
        super();
        this.gameManager = gameManager;
        this.gameButton = new Button(() => gameManager.swapScene('playing'), new Vector2(200, 200), 200, 50);
    }

    update(): void {
        // TODO: implement update logic for MainMenu
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // TODO: implement draw logic for MainMenu

        ctx.fillStyle = 'grey'
        ctx.fillRect(0, 0, 800, 600);

        this.gameButton.draw(ctx)
    }

    onEnter(): void {
        console.log("switch to main menu")
    }

    handleInput(): void {
        window.addEventListener('mousedown', (e) => {
            // e.clientX; e.clientY;
            if (e.clientX > this.gameButton.position.x &&
                e.clientX < this.gameButton.position.x + this.gameButton.width &&
                e.clientY - 45 > this.gameButton.position.y &&
                e.clientY - 45 < this.gameButton.position.y + this.gameButton.height
            ) {
                this.gameButton.callFunction();
            }

        });
    }
}

export class GameScene extends Scene {
    private gameManager: GameManager;
    private roadManager: RoadManager;
    public playerController: PlayerController;
    private car: Car;
    private camera = new Vector2(0, 0);

    constructor(gameManager: GameManager) {
        super();
        this.gameManager = gameManager;
        this.car = new Car(new Vector2(400, 300));
        this.roadManager = new RoadManager(new Vector2(400, 600));
        this.playerController = new PlayerController(this.car);
    }

    update(): void {
        // === Game Logic ===
        if (this.roadManager.end.distanceTo(this.playerController.car.position) < 100) {
            this.roadManager.generateRoad();
        }

        this.car.update();
        this.camera.x = this.car.position.x - 800 / 2;
        this.camera.y = this.car.position.y - 600 / 2;

        this.playerController.update();

        if (!this.playerController.isOnRoad(this.roadManager.roads)) {
            console.log("Off the road!")
        }
    }

    onEnter(): void {
        console.log("switch to game scene")
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // TODO: implement draw logic for MainMenu

        ctx.fillStyle = 'blue'
        ctx.fillRect(0, 0, 800, 600);

        // === Drawing ===
        ctx.save();
        ctx.translate(-this.camera.x, -this.camera.y);
        this.roadManager.draw(ctx);
        this.car.draw(ctx);
        // drawFPS(ctx);
        ctx.restore();
    }

    handleInput(): void {
        window.addEventListener('keydown', (e) => {
            if(e.key == 'Escape') this.gameManager.swapScene('paused')
        })
    }
}

export class PauseScene extends Scene {
    private gameManager: GameManager;
    private gameButton: Button;

    constructor(gameManager: GameManager) {
        super();
        this.gameManager = gameManager;
        this.gameButton = new Button(() => gameManager.swapScene('playing'), new Vector2(200, 200), 200, 50);
    }

    update(): void {
        // TODO: implement update logic for MainMenu
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // TODO: implement draw logic for MainMenu
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // RGBA: black with 50% opacity
        ctx.fillRect(0, 0, 800, 600);

        this.gameButton.draw(ctx)
    }

    onEnter(): void {
        // Pause via the playercontroller 
        console.log("switch to pause Menu")
        this.gameManager.pauseGame();
    }

    handleInput(): void {
        window.addEventListener('mousedown', (e) => {
            if (e.clientX > this.gameButton.position.x &&
                e.clientX < this.gameButton.position.x + this.gameButton.width &&
                e.clientY - 45 > this.gameButton.position.y &&
                e.clientY - 45 < this.gameButton.position.y + this.gameButton.height
            ) {
                this.gameButton.callFunction();
            }
        });

        window.addEventListener('keydown', (e) => {
            if(e.key == 'Escape') this.gameManager.swapScene('playing')
        })
    }
}
