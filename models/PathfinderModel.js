import nextConfig from "../next.config";

export default class PathfinderModel {
    #id;
    #name;
    #userId;

    constructor({ id, name, userId }) {
        this.#id = id;
        this.#name = name;
        this.#userId = userId;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get userId() {
        return this.#userId;
    }

    async deletePathfinder(token) {
        const deletePathfinderResponse = await fetch(`${nextConfig.urlApi.dev}/pathfinder/delete/${this.#userId}/${this.#id}`, {
            method: "DELETE",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const { message } = await deletePathfinderResponse.json();

        if (deletePathfinderResponse.status === 200) {
            return {
                flag: true,
                message
            }
        } else if (deletePathfinderResponse.status === 401) {
            return {
                flag: false,
                message
            }
        }
    }

    async editPathfinder(token) {
        const requestBody = {
            pathfinderName: this.#name
        }

        const editPathfinderResponse = await fetch(`${nextConfig.urlApi.dev}/pathfinder/edit/${this.#userId}/${this.#id}`, {
            method: "PUT",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        const { message } = await editPathfinderResponse.json();

        if (editPathfinderResponse.status === 200) {
            return {
                flag: true,
                message
            }
        } else if (editPathfinderResponse.status === 401) {
            return {
                flag: false,
                message
            }
        }
    }

    async getPathfinderData(token) {
        const getPathfinderDataResponse = await fetch(`${nextConfig.urlApi.dev}/pathfinder/${this.#userId}/${this.#id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const { message, pathfinder } = await getPathfinderDataResponse.json();

        if (getPathfinderDataResponse.status === 200) {
            const { id, name, userId } = pathfinder;

            this.#id = id;
            this.#name = name;
            this.#userId = userId;

            return {
                flag: true,
                message
            }
        } else if (getPathfinderDataResponse.status === 401) {
            return {
                flag: false,
                message
            }
        }
    }
}