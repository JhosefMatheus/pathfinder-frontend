import nextConfig from "../next.config";

export default class Pathfinder {
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
}