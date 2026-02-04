import { Module } from '@nestjs/common'; // Importing the Module decorator to define a NestJS module
import { ProductsService } from './products.service'; // Import the ProductsService to handle business logic
import { ProductsController } from './products.controller'; // Import the ProductsController to handle HTTP requests
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule to interact with the database
import { Product } from './product.entity'; // Import the Product entity to interact with the Product table in the database

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Import TypeOrmModule with the Product entity to allow interaction with the Product table
  providers: [ProductsService], // Define the ProductsService as a provider that will handle the business logic of the Products module
  controllers: [ProductsController] // Register the ProductsController to handle the HTTP routes for Product operations
})
export class ProductsModule { } // Define the ProductsModule that encapsulates the Product-related functionality
