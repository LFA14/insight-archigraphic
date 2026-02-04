import { Module } from '@nestjs/common'; // Importing the necessary decorator from NestJS for module definition
import { TypeOrmModule } from '@nestjs/typeorm'; // Importing TypeOrmModule to integrate TypeORM functionality into the module
import { Stock } from './stock.entity'; // Importing the Stock entity
import { StockService } from './stock.service'; // Importing the StockService that contains the business logic
import { StockController } from './stock.controller'; // Importing the StockController that handles HTTP requests
import { Product } from '../products/product.entity'; // Importing the Product entity, which is related to Stock

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock, Product]), // Registering Stock and Product entities with TypeOrm for database interaction
  ],
  providers: [StockService], // Registering the StockService to provide business logic for stock-related operations
  controllers: [StockController], // Registering the StockController to handle HTTP requests for stock resources
})
export class StockModule { } // Declaring and exporting the StockModule class as a NestJS module
