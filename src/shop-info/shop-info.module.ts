import { Module } from '@nestjs/common'; // Import the Module decorator to define a NestJS module
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule to interact with the database
import { ShopInfoController } from './shop-info.controller'; // Import the ShopInfoController to handle HTTP requests related to ShopInfo
import { ShopInfoService } from './shop-info.service'; // Import the ShopInfoService to handle business logic related to ShopInfo
import { ShopInfo } from './shop-info.entity'; // Import the ShopInfo entity to interact with the ShopInfo table in the database

@Module({
  imports: [TypeOrmModule.forFeature([ShopInfo])], // Import TypeOrmModule with the ShopInfo entity to interact with the ShopInfo table
  controllers: [ShopInfoController], // Register the ShopInfoController to handle the HTTP routes for ShopInfo operations
  providers: [ShopInfoService], // Define the ShopInfoService as a provider to handle the business logic for the ShopInfo module
})
export class ShopInfoModule { } // Define the ShopInfoModule that encapsulates the ShopInfo-related functionality
