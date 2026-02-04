import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // Constructor: Initializes the JwtStrategy by configuring passport-jwt with necessary settings
    // Parameters:
    // - configService: ConfigService for accessing environment variables
    // Purpose: Sets up the strategy to extract JWT from the request header and defines other options
    constructor(private configService: ConfigService) {
        super({
            // Extract the JWT token from the Authorization header as a Bearer token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Do not ignore expiration; validate expiration as per the JWT payload
            ignoreExpiration: false,
            // Secret key used to verify the JWT's signature; fetched from the environment variables
            secretOrKey: configService.get<string>('SECRET_KEY') || 'fallbackSecretKey', // Fallback to a default key if not found
        });
    }

    // validate: This method will be called after the JWT is validated. It is used to pass the payload to the request.
    // Parameters:
    // - payload: The JWT payload (usually contains user information like userId, username)
    // Returns: An object containing userId and username, which will be added to the request object
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
