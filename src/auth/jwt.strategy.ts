import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req): string => {
                return req.cookies["accessToken"]
            }]),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_JWT
        });
    }

    async validate(payload: any) {
        return {userId: payload.sub.userId, email: payload.email};
    }
}