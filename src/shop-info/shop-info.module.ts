import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopInfoController } from './shop-info.controller';
import { ShopInfoService } from './shop-info.service';
import { ShopInfo } from './shop-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopInfo])],
  controllers: [ShopInfoController],
  providers: [ShopInfoService],
})
export class ShopInfoModule { }
