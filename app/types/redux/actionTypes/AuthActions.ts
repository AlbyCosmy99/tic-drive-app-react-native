import User from "../../User";
import { AuthActionTypes } from "../enums/AuthActionTypes";

interface LoginAction {
    type: AuthActionTypes.LOGIN,
    payload: User
}

