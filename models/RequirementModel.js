import nextConfig from "../next.config";
import SubRequirementModel from "./SubRequirementModel";
import SubRequirementsModel from "./SubRequirementsModel";

export default class RequirementModel {
    #id;
    #content;
    #requirementGroupId;
    #classId;

    constructor({ id, content, requirementGroupId, classId }) {
        this.#id = id;
        this.#content = content;
        this.#requirementGroupId = requirementGroupId;
        this.#classId = classId;
    }

    get id() {
        return this.#id;
    }

    get content() {
        return this.#content;
    }

    get requirementGroupId() {
        return this.#requirementGroupId;
    }

    get classId() {
        return this.#classId;
    }

    async getSubRequirements(token) {
        const getSubRequirementsResponse = await fetch(`${nextConfig.urlApi.dev}/class/classes/subRequirements/${this.#id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const { message, subRequirements } = await getSubRequirementsResponse.json();

        return new SubRequirementsModel({ subRequirements: subRequirements.map(subRequirement => new SubRequirementModel({ id: subRequirement.id, content: subRequirement.content, subrequirementTypeId: subRequirement.subrequirementTypeId, requirementId: subRequirement.requirementId })) });
    }
}