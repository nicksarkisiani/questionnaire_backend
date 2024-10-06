import {Injectable, UnauthorizedException} from '@nestjs/common';
import {registrationDto} from "./dto/registration.dto";
import {UserService} from "../user/user.service";
import {comparePassword, compareToken} from "../utils/bcrypt";
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/user.entity";
import * as process from "node:process";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
    }

    async registration(dto: registrationDto): Promise<any> {
        const user =  await this.userService.createUser(dto)
        return await this.returnAndUpdateTokens(user)
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email);
        if (user && comparePassword(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null
    }

    async login(user: User) {
        return await this.returnAndUpdateTokens(user)
    }

    generateTokens(user: User) {
        const payload = {
            email: user.email,
            sub: {
                id: user.id,
            }
        }
        const accessToken = this.jwtService.sign(payload, {secret: process.env.SECRET_JWT})
        const refreshToken = this.jwtService.sign(payload, {secret: process.env.SECRET_REFRESH_JWT, expiresIn: '7d'})
        return {
            accessToken,
            refreshToken,
        }
    }

    async returnAndUpdateTokens(user: User) {
        const tokens = this.generateTokens(user)
        await this.userService.updateOrSaveRefreshToken(user, tokens.refreshToken)
        return tokens
    }

    async refreshTokens(refreshToken: string) {
        try {
            const decoded = this.jwtService.verify(refreshToken, {
                secret: process.env.SECRET_REFRESH_JWT
            })
            const user = await this.userService.findUserById(decoded.sub.id)
            if(!user) throw new UnauthorizedException("User not found")
            if(!compareToken(refreshToken, user.refreshToken)){
                throw new UnauthorizedException("Refresh token is not valid")
            }
            return this.generateTokens(user)
        } catch (e) {
            throw new UnauthorizedException("Refresh token is expired")
        }
    }
}

