export default class RequirementPathfinderModel {
    #id;
    #pathfinderId;
    #requirementId;
    #status;

    constructor({ id, pathfinderId, requirementId, status }) {
        this.#id = id;
        this.#pathfinderId = pathfinderId;
        this.#requirementId = requirementId;
        this.#status = status;
    }

    get id() {
        return this.#id;
    }

    get pathfinderId() {
        return this.#pathfinderId;
    }

    get requirementId() {
        return this.#requirementId;
    }

    get status() {
        return this.#status;
    }

    set status(status) {
        this.#status = status;
    }
}