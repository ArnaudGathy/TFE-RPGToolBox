/* 
Classe temporaire pour le mockup de joueurs (à importer depuis sheets)
*/

import Player from './Player';

class PlayerService {
    constructor() {
        this.players = [
            new Player("Arnaud"),
            new Player("Arcady"),
            new Player("Cochonax"),
            new Player("Barbacus")
        ];
    }
}

export default PlayerService;