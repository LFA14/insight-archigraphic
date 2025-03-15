import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productsRepository.create(createProductDto);
        return await this.productsRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return await this.productsRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({ where: { productID: id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id); // Ensures product exists, otherwise throws NotFoundException
        Object.assign(product, updateProductDto);
        return await this.productsRepository.save(product);
    }

    async remove(id: number): Promise<void> {
        const result = await this.productsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
    }
}
