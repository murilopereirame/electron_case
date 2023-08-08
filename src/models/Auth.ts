import * as m from "mithril"
import Notification from "./Notification";
import {EToast} from "../components/Toast";

export interface IAuth {
    email: string
    password: string
    confirmPassword: string
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    setConfirmPassword: (password: string) => void
    canSubmit: () => boolean
    canRegister: () => boolean
    setToken: (token: string, expDate: string) => void
    isLogged: () => boolean
    getToken: () => string
    login: () => Promise<boolean>
    register: () => Promise<boolean>
}

export interface IResponse {
    message: string
    data: any,
    details: any[]
    status: string
}

interface ILoginResponse extends IResponse {
    data: {
        token: string
        validUntil: string
    },
}

const Auth: IAuth = {
    email: "",
    password: "",
    confirmPassword: "",
    setEmail: (email: string) => {
        Auth.email = email
    },
    setPassword: (password: string) => {
        Auth.password = password
    },
    setConfirmPassword: (password: string) => {
        Auth.confirmPassword = password
    },
    canSubmit: () => Auth.email !== "" && Auth.password !== "",
    canRegister: () => Auth.email !== "" && Auth.password !== "" &&
      Auth.confirmPassword !== "" && Auth.password === Auth.confirmPassword,
    setToken: (token: string, expDate: string) => {
        localStorage.setItem("access_token", token)
        localStorage.setItem("exp_date", expDate)
    },
    isLogged: () => localStorage
        .getItem("access_token") &&
        new Date(localStorage.getItem("exp_date")).getTime() > Date.now(),
    getToken: () => {
        return localStorage.getItem("access_token")
    },
    login: async () => {
        const loginResult: ILoginResponse = await m.request({
            url: "https://spring.murilopereira.dev.br:8443/users/auth",
            body: {
                email: Auth.email,
                password: Auth.password
            },
            method: "POST"
        })

        Auth.setToken(loginResult.data.token, loginResult.data.validUntil)
        Auth.setEmail("")
        Auth.setPassword("")
        return true
    },
    register: async () => {
        await m.request({
            url: "https://spring.murilopereira.dev.br:8443/users/register",
            body: {
                email: Auth.email,
                password: Auth.password
            },
            method: "POST"
        })

        Auth.setEmail("")
        Auth.setPassword("")
        return true;
    }
}

export default Auth;