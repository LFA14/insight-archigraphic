import { Module } from '@nestjs/common'; // Importing the Module decorator from NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importing TypeOrmModule to connect with the database
import { AppController } from './app.controller'; // Importing AppController to manage HTTP requests
import { AppService } from './app.service'; // Importing AppService to handle business logic
import { EmployeesModule } from './employees/employees.module'; // Importing EmployeesModule to manage employee-related operations
import { Employee } from './employees/employee.entity'; // Importing Employee entity to map to the Employee table in the database
import { ProductsModule } from './products/products.module'; // Importing ProductsModule to manage products
import { ShopInfoModule } from './shop-info/shop-info.module'; // Importing ShopInfoModule to manage shop information
import { StockModule } from './stock/stock.module'; // Importing StockModule to manage stock-related data
import { AuthModule } from './auth/auth.module'; // Importing AuthModule for authentication functionality
import { UsersModule } from './users/users.module'; // Importing UsersModule for user-related functionality
import { User } from './users/user.entity'; // Importing User entity to map to the User table in the database
import { Stock } from './stock/stock.entity'; // Importing Stock entity to map to the Stock table
import { ShopInfo } from './shop-info/shop-info.entity'; // Importing ShopInfo entity to map to the ShopInfo table
import { Product } from './products/product.entity'; // Importing Product entity to map to the Product table
import { ConfigModule } from '@nestjs/config'; // Importing ConfigModule to manage configuration variables

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Setting the database type to MySQL
      host: '127.0.0.1', // Database host
      port: 3306, // Database port
      username: 'root', // Database username
      password: 'Yasser_za1', // Database password
      database: 'insight_managment', // The name of the database to connect to
      entities: [Employee, User, Stock, ShopInfo, Product], // List of entities that TypeORM will manage
      autoLoadEntities: true, // Automatically load entities (can help reduce boilerplate code)
      synchronize: false, // Do not synchronize the schema automatically (set to true only in development)
    }),
    ConfigModule.forRoot({ isGlobal: true }), // Loading environment variables globally
    EmployeesModule, // Importing EmployeesModule to handle employee-related logic
    ProductsModule, // Importing ProductsModule to handle product-related logic
    ShopInfoModule, // Importing ShopInfoModule to handle shop information
    StockModule, // Importing StockModule to manage stock data
    AuthModule, // Importing AuthModule for authentication
    UsersModule, // Importing UsersModule to manage user-related functionality
  ],
  controllers: [AppController], // Registering the AppController to manage incoming requests
  providers: [AppService], // Registering the AppService to handle business logic
})
export class AppModule { }
