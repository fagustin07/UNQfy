const { UNQfyError } = require('./abstract_errors');

class EntityNotFound extends UNQfyError {
    constructor(entity){
        super(`${entity} not found`);
    }
}

class EntityAlreadyExists extends UNQfyError {
    constructor(entity){
        super(`${entity} already exists`);
    }
}

class RelatedEntityNotFound extends UNQfyError {
    constructor(entity){
        super(`Related ${entity.toLowerCase()} not found`);
    }
}

class EntityCalledNotFound extends EntityNotFound {
    constructor(entity, name){
        super(`${entity} ${name}`);
    }
}

module.exports = {
    EntityCalledNotFound,
    EntityAlreadyExists,
    EntityNotFound,
    RelatedEntityNotFound
}