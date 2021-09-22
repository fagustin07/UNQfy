class Pair {
    constructor(fst, snd) {
        this.first = fst;
        this.second = snd;
    }

    get fst() { return this.first; }
    get snd() { return this.second; }

    set fst(newValue) { this.first = newValue;}
    set snd(newValue) { this.second = newValue;}
}

module.exports = Pair;