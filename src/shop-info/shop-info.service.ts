import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopInfo } from './shop-info.entity';
import { UpdateShopInfoDto } from './dto/update-shop-info.dto';

@Injectable()
export class ShopInfoService {
    // Constructor for ShopInfoService
    // Purpose: Injects the ShopInfo repository to handle database operations
    constructor(
        @InjectRepository(ShopInfo)
        private readonly shopInfoRepository: Repository<ShopInfo>,
    ) { }

    // Method: findAll
    // Returns: An array of all ShopInfo entities
    // Purpose: Retrieves all shop information from the database
    async findAll(): Promise<ShopInfo[]> {
        return this.shopInfoRepository.find();
    }

    // Method: update
    // Parameters:
    // - shopName: The name of the shop whose information is to be updated
    // - updateShopInfoDto: DTO containing updated shop information
    // Returns: The updated ShopInfo entity
    // Throws: NotFoundException if shop information with the given name is not found
    // Purpose: Updates the shop information based on the shop name
    async update(shopName: string, updateShopInfoDto: UpdateShopInfoDto): Promise<ShopInfo> {
        const shopInfo = await this.shopInfoRepository.findOne({ where: { shopName } });
        if (!shopInfo) {
            throw new NotFoundException('Shop info not found');
        }
        Object.assign(shopInfo, updateShopInfoDto);
        return this.shopInfoRepository.save(shopInfo);
    }
}
