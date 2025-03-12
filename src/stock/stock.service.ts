import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Product } from '../products/product.entity';

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(Stock)
        private readonly stockRepository: Repository<Stock>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async create(createStockDto: CreateStockDto): Promise<Stock> {
        const product = await this.productRepository.findOneBy({ productID: createStockDto.productID });
        if (!product) throw new NotFoundException('Product not found');

        const stock = this.stockRepository.create({ ...createStockDto, product });
        return this.stockRepository.save(stock);
    }

    async findAll(): Promise<Stock[]> {
        return this.stockRepository.find({ relations: ['product'] });
    }

    async findOne(id: number): Promise<Stock> {
        const stock = await this.stockRepository.findOne({ where: { stockID: id }, relations: ['product'] });
        if (!stock) throw new NotFoundException('Stock entry not found');
        return stock;
    }

    async update(id: number, updateStockDto: UpdateStockDto): Promise<Stock> {
        const stock = await this.findOne(id);
        if (updateStockDto.productID) {
            const product = await this.productRepository.findOneBy({ productID: updateStockDto.productID });
            if (!product) throw new NotFoundException('Product not found');
            stock.product = product;
        }
        Object.assign(stock, updateStockDto);
        return this.stockRepository.save(stock);
    }

    async remove(id: number): Promise<void> {
        const stock = await this.findOne(id);
        await this.stockRepository.remove(stock);
    }
}
