import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/employee.entity';
import { ProductsModule } from './products/products.module';
import { ShopInfoModule } from './shop-info/shop-info.module';
import { StockModule } from './stock/stock.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Stock } from './stock/stock.entity';
import { ShopInfo } from './shop-info/shop-info.entity';
import { Product } from './products/product.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Yasser_za1',
      database: 'insight_managment',
      entities: [Employee, User, Stock, ShopInfo, Product],
      autoLoadEntities: true,
      synchronize: false,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    EmployeesModule,
    ProductsModule,
    ShopInfoModule,
    StockModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule { }

