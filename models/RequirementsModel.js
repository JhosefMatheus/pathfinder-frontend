import nextConfig from "../next.config";
import RequirementModel from "./RequirementModel";

export default class RequirementsModel {
    #requirements;

    constructor({ requirements }) {
        this.#requirements = requirements;
    }

    get requirements() {
        return this.#requirements;
    }

    set requirements(requirements) {
        this.#requirements = requirements;
    }

    async getRequirements(token, classId, requirementGroupId) {
        const getRequirementsResponse = await fetch(`${nextConfig.urlApi.dev}/class/classes/requirements/${classId}/${requirementGroupId}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const { message, requirements } = await getRequirementsResponse.json();

        if (getRequirementsResponse.status === 200) {
            this.#requirements = requirements.map(requirement => new RequirementModel({ id: requirement.id, content: requirement.content, requirementGroupId: requirement.requirementGroupId, classId: requirement.classId }));

            return true;
        } else if (getRequirementsResponse.status === 401) {
            return false;
        }
    }
}