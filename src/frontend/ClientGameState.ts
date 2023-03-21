import GameState from "../backend/models/GameState";
import Player from "../backend/models/Player";

export default class ClientGameState extends GameState{
    public currentPlayer: Player;

    constructor(gameState: GameState, socketId: string) {
        super(gameState.players);
        this.currentPlayer =  Object.values(gameState.players).find(p => p.id === socketId);

    }

    isCurrentExist(){
        return this.currentPlayer !== null;
    }
}
