import { Controller, Get, Put, Param, Body, Patch } from '@nestjs/common';
import { ShopInfoService } from './shop-info.service';
import { ShopInfo } from './shop-info.entity';
import { UpdateShopInfoDto } from './dto/update-shop-info.dto';

@Controller('shop-info')
export class ShopInfoController {
    constructor(private readonly shopInfoService: ShopInfoService) { }

    // Method: findAll
    // Route: GET /shop-info
    // Parameters: None
    // Returns: An array of ShopInfo objects.
    // Purpose: Retrieves all shop information records from the database.
    @Get()
    findAll(): Promise<ShopInfo[]> {
        return this.shopInfoService.findAll();
    }

    // Method: update
    // Route: PATCH /shop-info/:shopName
    // Parameters:
    // - shopName: The name of the shop to update.
    // - updateShopInfoDto: An object containing the fields to update in the shop record.
    // Returns: The updated ShopInfo object.
    // Purpose: Updates a specific shop's information based on its name.
    @Patch(':shopName')
    update(
        @Param('shopName') shopName: string,
        @Body() updateShopInfoDto: UpdateShopInfoDto,
    ): Promise<ShopInfo> {
        return this.shopInfoService.update(shopName, updateShopInfoDto);
    }
}
