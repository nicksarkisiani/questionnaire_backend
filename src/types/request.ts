import {Request} from "express";
import {User} from "../users/user.entity";

export interface IRequest extends Request {
    user: User
}

