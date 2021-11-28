class IDGenerator{
    constructor() {
        this.idCounter = 1;
    }
    newId(){
        return this.idCounter++;
    }
    static getInstance(){
        return Singleton.getInstance();
    }
}

const Singleton = (function () {
    let idGeneratorInstance;
    function createInstance() {
        const instance = new IDGenerator();
        return instance;
    }
    return {
        getInstance: function () {
            if (!idGeneratorInstance) {
                idGeneratorInstance = createInstance();
            }
            return idGeneratorInstance;
        }
    };
})();
const _idGenerator = Singleton.getInstance();
module.exports = _idGenerator;