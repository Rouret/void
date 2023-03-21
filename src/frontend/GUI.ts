import Log from "../backend/utils/Log";
import Client from "./Client";
import Keyboard, {KeyboardState} from "./Keyboard";

export default class GUI{
    private _canvas: HTMLCanvasElement = document.getElementById(
        "app"
    ) as HTMLCanvasElement;

    private _UIcanvas: HTMLCanvasElement = document.getElementById(
        "ui"
    ) as HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _UIctx: CanvasRenderingContext2D;
    public isUIHaveChanged = true;
    private _keyboard: Keyboard;

    constructor(private _client: Client) {

        this._ctx = this._canvas.getContext("2d");
        this._UIctx = this._UIcanvas.getContext("2d");

        this._canvas.width = window.document.documentElement.clientWidth - 4;
        this._canvas.height = window.document.documentElement.clientHeight - 4;
        this._UIcanvas.width = window.document.documentElement.clientWidth - 4;
        this._UIcanvas.height = window.document.documentElement.clientHeight - 4;

        if (this._canvas.getContext("2d") && this._UIcanvas.getContext("2d")) {
            this._keyboard = new Keyboard();
        }else{
            Log.error("Canvas is not supported");
        }
    }

    init(){
        this._loop();
    }

    _loop(){
        if(this._client.currentGameState.currentPlayer === null) requestAnimationFrame(this._loop.bind(this))
        this.draw();

        if(this.isUIHaveChanged){
            this.drawUI();
            this.isUIHaveChanged= false;
        }

        requestAnimationFrame(this._loop.bind(this))
    }

    draw(){
        this._ctx.fillStyle = "#91CB6F";
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawUI(){
        //DRAW TOP LEFT UI
        //circle for avatar
        this._UIctx.save()
        this._UIctx.beginPath();
        this._UIctx.arc(50, 50, 40, 0, 2 * Math.PI);
        this._UIctx.fillStyle = "#ffffff";
        this._UIctx.fill();
        this._UIctx.closePath();

        //name of player
        this._UIctx.font = "20px Arial";
        this._UIctx.fillStyle = "#000000";
        this._UIctx.fillText("Player", 100, 35);

        //hp bar
        this._UIctx.fillStyle = "#AAA";
        this._UIctx.fillRect(100, 45, 150, 10);
        this._UIctx.fillStyle = "#ff0000";
        const newWidth = (this._client.currentGameState.currentPlayer.maxHp * 150) / this._client.currentGameState.currentPlayer.hp;
        this._UIctx.fillRect(100, 45, newWidth, 10);

        //endurance bar
        this._UIctx.fillStyle = "#00ff00";
        this._UIctx.fillRect(100, 65, 100, 10);

        this._UIctx.restore();
    }
}
