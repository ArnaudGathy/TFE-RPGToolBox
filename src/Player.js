class Player {
    constructor(name) {
        // this.map = map;
        // this.name = map.get("nom");
        // this.initiative = map.get("initiative");
        this.name = name;
        this.roll = undefined;
        this.success = false;
        console.log(this.map);
    };

    // setRoll(roll) {
    //     this.success = undefined;
    //     if(roll == 20) this.success = true;
    //     if(roll == 1) this.success = false;

    //     this.roll = roll;
    //     if(roll != 1 && roll != 20) this.roll += this.initiative;
    // }
}

export default Player;