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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Yasser_za1',
      database: 'insight_managment',
      entities: [Employee],
      autoLoadEntities: true,
      synchronize: false,
    }),
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

