import nextConfig from "../next.config";
import PathfinderModel from "./PathfinderModel";

export default class UserModel {
    #id;
    #name;
    #login;
    #password

    constructor({ id, name, login, password }) {
        this.#id = id;
        this.#name = name;
        this.#login = login;
        this.#password = password;
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
    
    get login() {
        return this.#login;
    }

    set login(login) {
        this.#login = login;
    }
    
    get password() {
        return this.#password;
    }

    set password(password) {
        this.#password = password;
    }

    async signIn() {
        if (!this.#login || !this.#password) {
            return {
                flag: false,
                message: "Campos de login ou senha não estão preenchidos."
            }
        } else {
            const requestBody = {
                login: this.#login,
                password: this.#password
            }
    
            const signInResponse = await fetch(`${nextConfig.urlApi.dev}/auth/signIn`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const { message, token, userInfo } = await signInResponse.json();

            if (signInResponse.status === 200) {
                const { id, name } = userInfo;

                this.#id = id;
                this.#name = name;

                return {
                    flag: true,
                    message,
                    token,
                    userInfo
                }

            } else if (signInResponse.status === 401) {
                return {
                    flag: false,
                    message
                }
            }
        }
    }

    async signUp() {
        const requestBody = {
            name: this.#name,
            login: this.#login,
            password: this.#password
        }

        const signUpResponse = await fetch(`${nextConfig.urlApi.dev}/auth/signUp`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const { message } = await signUpResponse.json();

        if (signUpResponse.status === 200) {
            return {
                flag: true,
                message
            }
        } else if (signUpResponse.status === 401) {
            return {
                flag: false,
                message
            }
        }
    }

    async getPathfinders(token) {
        const getPathfindersResponse = await fetch(`${nextConfig.urlApi.dev}/pathfinder/pathfinders/${this.#id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const { pathfinders } = await getPathfindersResponse.json();

        if (getPathfindersResponse.status === 200) {
            return {
                flag: true,
                pathfinders: pathfinders.map(e => new PathfinderModel({ id: e.id, name: e.name, userId: e.userId }))
            }
        }
    }

    async createPathfinder(token, pathfinderName) {
        const requestBody = {
            pathfinderName
        }

        const createPathfinderResponse = await fetch(`${nextConfig.urlApi.dev}/pathfinder/create/${this.#id}`, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        const { message } = await createPathfinderResponse.json();

        if (createPathfinderResponse.status === 200) {
            return {
                flag: true,
                message
            }
        } else if (createPathfinderResponse.status === 401) {
            return {
                flag: false,
                message
            }
        }
    }
}