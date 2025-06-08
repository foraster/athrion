import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._email = ""
        this._firstName = ""
        this._lastName = ""
        this._user = null
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setEmail(email) {
        this._email = email
    }
    setUser(user) {
        this._user = user
    }
    setName(firstName, lastName) {
        this._firstName = firstName
        this._lastName = lastName
    }
    
    get isAuth() {
        return this._isAuth
    }
    get email() {
        return this._email
    }
    get user() {
        return this._user
    }
    get firstName() {
        return this._firstName
    }
    get lastName() {
        return this._lastName
    }

    reset() {
        this._isAuth = false;
        this._email = "";
        this._user = null;
    }
}

