import nextConfig from "../next.config";

export default class ClassModel {
    #id;
    #name;
    #figure;
    
    constructor({ id, name, figure }) {
        this.#id = id;
        this.#name = name;
        this.#figure = figure;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get figure() {
        return this.#figure;
    }

    async getClasses(token) {
        const getClassesResponse = await fetch(`${nextConfig.urlApi.dev}/class/classes`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const { classes } = await getClassesResponse.json();

        return classes;
    }

    async getClassData(token) {
        const getClassDataResponse = await fetch(`${nextConfig.urlApi.dev}/class/${this.#id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":  `Bearer ${token}`
            }
        });

        const { message, selectedClass } = await getClassDataResponse.json();

        if (getClassDataResponse.status === 200) {
            this.#name = selectedClass.name;
            this.#figure = selectedClass.figure;

            return true;
        } else if (getClassDataResponse.status === 401) {
            return false;
        }
    }
}