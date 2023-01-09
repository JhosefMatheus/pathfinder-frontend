export default class SubRequirementModel {
    #id;
    #content;
    #subrequirementTypeId;
    #requirementId;

    constructor({ id, content, subrequirementTypeId, requirementId }) {
        this.#id = id;
        this.#content = content;
        this.#subrequirementTypeId = subrequirementTypeId;
        this.#requirementId = requirementId;
    }

    get id() {
        return this.#id;
    }

    get content() {
        return this.#content;
    }

    get subrequirementTypeId() {
        return this.#subrequirementTypeId;
    }

    get requirementId() {
        return this.#requirementId;
    }
}