import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    constructor(private authService: AuthService) {
        super({
            clientID: '146349853348-km6sknl2t15qhdc6166l3hjuegl3vrco.apps.googleusercontent.com',     // <- Replace this with your client id
            clientSecret: '_kBq8WWe2taKvAUTcSVcwBCH', // <- Replace this with your client secret
            callbackURL: 'http://localhost:9050/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile'],
        });
    }


    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
        try {
            const jwt = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
            const user = { jwt };
            console.log("validate -> null, user", null, user)
            done(null, user);
        }
        catch (err) {
            done(err, false);
        }
    }

}