import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    // Constructor for ProductsService
    // Purpose: Injects the Product repository to handle database operations
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) { }

    // Method: create
    // Parameters:
    // - createProductDto: DTO containing product data to be created
    // Returns: The created Product entity
    // Purpose: Creates and saves a new product to the database
    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productsRepository.create(createProductDto);
        return await this.productsRepository.save(product);
    }

    // Method: findAll
    // Returns: An array of all Product entities
    // Purpose: Retrieves all products from the database
    async findAll(): Promise<Product[]> {
        return await this.productsRepository.find();
    }

    // Method: findOne
    // Parameters:
    // - id: The ID of the product to find
    // Returns: The Product entity with the given ID
    // Throws: NotFoundException if product is not found
    // Purpose: Retrieves a single product by ID
    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({ where: { productID: id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    // Method: findByCategory
    // Parameters:
    // - productCategory: The category of products to find
    // Returns: An array of Product entities matching the specified category
    // Purpose: Retrieves products by their category
    async findByCategory(productCategory: string): Promise<Product[]> {
        return await this.productsRepository.find({
            where: { productCategory },
        });
    }

    // Method: update
    // Parameters:
    // - id: The ID of the product to update
    // - updateProductDto: DTO containing updated product data
    // Returns: The updated Product entity
    // Purpose: Updates an existing product's information
    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id); // Ensures product exists, otherwise throws NotFoundException
        Object.assign(product, updateProductDto);
        return await this.productsRepository.save(product);
    }

    // Method: remove
    // Parameters:
    // - id: The ID of the product to remove
    // Returns: void
    // Throws: NotFoundException if product is not found
    // Purpose: Deletes a product by ID
    async remove(id: number): Promise<void> {
        const result = await this.productsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
    }
}
