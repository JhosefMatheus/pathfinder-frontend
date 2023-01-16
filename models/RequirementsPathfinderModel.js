import nextConfig from "../next.config";

export default class RequirementsPathfinderModel {
    #requirementsPathfinder;

    constructor({ requirementsPathfinder }) {
        this.#requirementsPathfinder = requirementsPathfinder;
    }

    get requirementsPathfinder() {
        return this.#requirementsPathfinder;
    }

    set requirementsPathfinder(requirementsPathfinder) {
        this.#requirementsPathfinder = requirementsPathfinder;
    }

    async saveRequirementsPathfinder(token) {
        const requestBody = {
            addedRequirementsPathfinder: this.#requirementsPathfinder.filter(e => e.status === "adicionado").map(e => {
                return {
                    id: e.id,
                    pathfinderId: e.pathfinderId,
                    requirementId: e.requirementId
                }
            }),
            deletedRequirementsPathfinder: this.#requirementsPathfinder.filter(e => e.status === "excluído").map(e => {
                return {
                    id: e.id,
                    pathfinderId: e.pathfinderId,
                    requirementId: e.requirementId
                }
            })
        }

        console.log(requestBody);

        const saveRequirementsPathfinderResponse = await fetch(`${nextConfig.urlApi.dev}/requirementPathfinder/requirementsPathfinder/save`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });
    }
}