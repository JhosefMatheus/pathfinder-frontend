import nextConfig from "../next.config";
import RequirementGroup from "./RequirementGroupModel";

export default class RequirementGroupsModel {
    #requirementGroups;

    constructor({ requirementGroups }) {
        this.#requirementGroups = requirementGroups;
    }

    get requirementGroups() {
        return this.#requirementGroups;
    }

    set requirementGroups(requirementGroups) {
        this.#requirementGroups = requirementGroups;
    }

    async getRequirementGroups(token) {
        const getRequirementGroupsResponse = await fetch(`${nextConfig.urlApi.dev}/class/classes/requirementGroups`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const { requirementGroups } = await getRequirementGroupsResponse.json();

        this.#requirementGroups = requirementGroups.map(requirementGroup => new RequirementGroup({ id: requirementGroup.id, name: requirementGroup.name }));
    }
}