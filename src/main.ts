// Importing necessary modules and components from NestJS
import { NestFactory } from '@nestjs/core'; // Importing NestFactory to create a NestJS application instance
import { AppModule } from './app.module'; // Importing AppModule, which includes all module configurations
import { NestExpressApplication } from '@nestjs/platform-express'; // Importing NestExpressApplication for Express-based NestJS applications
import { join } from 'path'; // Importing join from path module to manage file paths

// Bootstrap function to initialize and run the application
async function bootstrap() {
  // Creating the NestJS application using the AppModule
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enabling CORS (Cross-Origin Resource Sharing) for frontend requests
  app.enableCors({
    origin: true, // Setting the frontend URL (adjust accordingly)
    credentials: true, // Allowing credentials (like cookies) in cross-origin requests
  });

  // Setting up static assets (e.g., images, CSS files, etc.) to be served from the 'public' directory
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/', // Defining the base URL for static assets
  });

  // Starting the application and listening on port 3001
  await app.listen(3001);
  console.log('🚀 Server is running on http://localhost:3001'); // Logging the success message
}

// Calling the bootstrap function to start the app
bootstrap();
