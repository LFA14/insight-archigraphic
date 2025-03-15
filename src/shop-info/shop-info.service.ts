import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopInfo } from './shop-info.entity';
import { UpdateShopInfoDto } from './dto/update-shop-info.dto';

@Injectable()
export class ShopInfoService {
    constructor(
        @InjectRepository(ShopInfo)
        private readonly shopInfoRepository: Repository<ShopInfo>,
    ) { }

    async findAll(): Promise<ShopInfo[]> {
        return this.shopInfoRepository.find();
    }

    async update(shopName: string, updateShopInfoDto: UpdateShopInfoDto): Promise<ShopInfo> {
        const shopInfo = await this.shopInfoRepository.findOne({ where: { shopName } });
        if (!shopInfo) {
            throw new NotFoundException('Shop info not found');
        }
        Object.assign(shopInfo, updateShopInfoDto);
        return this.shopInfoRepository.save(shopInfo);
    }
}
