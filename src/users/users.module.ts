import { Module } from '@nestjs/common'; // Importing the necessary decorator from NestJS for module definition
import { TypeOrmModule } from '@nestjs/typeorm'; // Importing TypeOrmModule to integrate TypeORM functionality into the module
import { UsersService } from './users.service'; // Importing the UsersService that contains the business logic for user-related operations
import { UsersController } from './users.controller'; // Importing the UsersController that handles HTTP requests for users
import { User } from './user.entity'; // Importing the User entity to interact with the database

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registering the User entity with TypeOrm for database interaction
  ],
  providers: [UsersService], // Registering the UsersService to provide business logic for user-related operations
  controllers: [UsersController], // Registering the UsersController to handle HTTP requests for user resources
  exports: [TypeOrmModule], // Exporting TypeOrmModule to allow access to the User repository in other modules
})
export class UsersModule { } // Declaring and exporting the UsersModule class as a NestJS module
