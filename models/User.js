import nextConfig from "../next.config";

export default class User {
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

            const { message, token } = await signInResponse.json();

            if (signInResponse.status === 200) {
                return {
                    flag: true,
                    message,
                    token
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
}