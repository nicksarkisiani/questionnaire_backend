import {Body, Controller, Post, UseGuards, Request, Res, UnauthorizedException, Get} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {registrationDto} from "./dto/registration.dto";
import {AuthGuard} from "@nestjs/passport";
import {Response} from "express";
import {JwtAuthGuard} from "./jwt-auth.guard";
import * as process from "node:process";


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post("/registration")
    async registration(@Body() dto: registrationDto, @Res() res: Response): Promise<any> {
        const {accessToken, refreshToken} = await this.authService.registration(dto)
        this.setCookies(res, accessToken, refreshToken, "Registration successfully");
    }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req, @Res() res: Response) {
        const {accessToken, refreshToken} = await this.authService.login(req.user);
        this.setCookies(res, accessToken, refreshToken, "Login successfully");
    }

    @Post("/verify")
    async verify(@Request() req, @Res() res: Response) {
        const refreshToken = req.cookies["refreshToken"];
        if(!refreshToken){
            throw new UnauthorizedException("Refresh token not found");
        }
        const tokens = await this.authService.refreshTokens(refreshToken);
        this.setCookies(res, tokens.accessToken, tokens.refreshToken, "Refresh successfully");
    }

    @Post("/logout")
    async logout(@Request() req, @Res() res: Response) {
        const refreshToken = req.cookies["refreshToken"];
        const accessToken = req.cookies["accessToken"];
        if(!refreshToken || !accessToken){
            throw new UnauthorizedException("User isn't logged in");
        }
        res.clearCookie('accessToken', {domain: process.env.API_URL, path: "/"});
        res.clearCookie('refreshToken', {domain: process.env.API_URL, path: "/"});
        res.send({message: 'Logged out successfully'});

    }


    setCookies(res: Response, accessToken: string, refreshToken: string, message: string) {
        const api = process.env.API_URL
        console.log(api)

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: !!+process.env.SECURE,
            maxAge: 15 * 60 * 1000,
            sameSite: "none",
            domain: process.env.API_URL,
            path: "/"
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !!+process.env.SECURE,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
            domain: process.env.API_URL,
            path: "/"
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !!+process.env.SECURE,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
            domain: `${api}`,
            path: "/"
        })

        res.send({message})
    }

    @UseGuards(JwtAuthGuard)
    @Post("/test")
    test(){
        return "123"
    }
}


