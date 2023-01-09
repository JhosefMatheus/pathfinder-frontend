export default class SubRequirementsModel {
    #subRequirements;

    constructor({ subRequirements }) {
        this.#subRequirements = subRequirements;
    }

    get subRequirements() {
        return this.#subRequirements;
    }
}