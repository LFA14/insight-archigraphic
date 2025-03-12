import { Controller, Get, Put, Param, Body, Patch } from '@nestjs/common';
import { ShopInfoService } from './shop-info.service';
import { ShopInfo } from './shop-info.entity';
import { UpdateShopInfoDto } from './dto/update-shop-info.dto';

@Controller('shop-info')
export class ShopInfoController {
    constructor(private readonly shopInfoService: ShopInfoService) { }

    @Get()
    findAll(): Promise<ShopInfo[]> {
        return this.shopInfoService.findAll();
    }

    @Patch(':shopName')
    update(
        @Param('shopName') shopName: string,
        @Body() updateShopInfoDto: UpdateShopInfoDto,
    ): Promise<ShopInfo> {
        return this.shopInfoService.update(shopName, updateShopInfoDto);
    }
}
