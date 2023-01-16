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
            requirementsPathfinder: this.#requirementsPathfinder
        }

        const saveRequirementsPathfinderResponse = await fetch(`${nextConfig.urlApi.dev}/requirementPathfinder/requirementsPathfinder/save`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        console.log("salvando requisitos cumpridos do desbravador...");
    }
}