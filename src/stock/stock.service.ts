import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Product } from '../products/product.entity';

@Injectable()
export class StockService {
    // Constructor for StockService
    // Purpose: Injects the Stock and Product repositories to handle database operations for Stock and associated Products
    constructor(
        @InjectRepository(Stock)
        private readonly stockRepository: Repository<Stock>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    // Method: create
    // Parameters:
    // - createStockDto: DTO containing the stock information to be created
    // Returns: The newly created Stock entity
    // Throws: NotFoundException if the product specified in the stock does not exist
    // Purpose: Creates a new stock entry and associates it with a product
    async create(createStockDto: CreateStockDto): Promise<Stock> {
        const product = await this.productRepository.findOneBy({ productID: createStockDto.productID });
        if (!product) {
            throw new NotFoundException(`Product with ID ${createStockDto.productID} not found`);
        }

        const stock = this.stockRepository.create({ ...createStockDto, product });
        return await this.stockRepository.save(stock);
    }

    // Method: findAll
    // Returns: An array of all Stock entities, including related product information
    // Purpose: Retrieves all stock entries with associated product data
    async findAll(): Promise<Stock[]> {
        return await this.stockRepository.find({ relations: ['product'] });
    }

    // Method: findOne
    // Parameters:
    // - id: The ID of the stock entry to be fetched
    // Returns: The found Stock entity
    // Throws: NotFoundException if the stock entry with the given ID is not found
    // Purpose: Retrieves a single stock entry by ID along with associated product data
    async findOne(id: number): Promise<Stock> {
        const stock = await this.stockRepository.findOne({ where: { stockID: id }, relations: ['product'] });
        if (!stock) {
            throw new NotFoundException(`Stock entry with ID ${id} not found`);
        }
        return stock;
    }

    // Method: update
    // Parameters:
    // - id: The ID of the stock entry to be updated
    // - updateStockDto: DTO containing the updated stock information
    // Returns: The updated Stock entity
    // Purpose: Updates an existing stock entry and reassigns it to a product if necessary
    async update(id: number, updateStockDto: UpdateStockDto): Promise<Stock> {
        const stock = await this.findOne(id); // Ensures stock exists, otherwise throws NotFoundException

        if (updateStockDto.productID) {
            const product = await this.productRepository.findOneBy({ productID: updateStockDto.productID });
            if (!product) {
                throw new NotFoundException(`Product with ID ${updateStockDto.productID} not found`);
            }
            stock.product = product;
        }

        Object.assign(stock, updateStockDto);
        return await this.stockRepository.save(stock);
    }

    // Method: remove
    // Parameters:
    // - id: The ID of the stock entry to be deleted
    // Returns: void
    // Throws: NotFoundException if the stock entry with the given ID is not found
    // Purpose: Removes a stock entry by ID
    async remove(id: number): Promise<void> {
        const result = await this.stockRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Stock entry with ID ${id} not found`);
        }
    }
}
