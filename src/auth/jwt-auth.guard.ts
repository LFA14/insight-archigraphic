import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // canActivate: This method is responsible for allowing the request to continue if the JWT is valid
    // Parameters:
    // - context: The execution context that contains request-specific information
    // Returns: It returns the result of the `canActivate` method from the AuthGuard
    canActivate(context: ExecutionContext) {
        // Call the `canActivate` method of the parent AuthGuard class with the execution context
        return super.canActivate(context);
    }
}
