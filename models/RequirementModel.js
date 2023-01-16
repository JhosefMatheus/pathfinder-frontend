import nextConfig from "../next.config";
import RequirementPathfinderModel from "./RequirementPathfinderModel";
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

    async getRequirementPathfinder(token, pathfinderId) {
        const getRequirementPathfinderResponse = await fetch(`${nextConfig.urlApi.dev}/requirementPathfinder/requirementsPathfinder/${pathfinderId}/${this.#id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const { message, requirementPathfinder } = await getRequirementPathfinderResponse.json();

        if (getRequirementPathfinderResponse.status === 200) {
            const returnedRequirementPathfinder = new RequirementPathfinderModel({
                id: requirementPathfinder.id,
                pathfinderId: requirementPathfinder.pathfinderId,
                requirementId: requirementPathfinder.requirementId,
                status: "normal"
            });

            return {
                flag: true,
                requirementPathfinder: returnedRequirementPathfinder
            }
        }

        return {
            flag: false
        }
    }
}