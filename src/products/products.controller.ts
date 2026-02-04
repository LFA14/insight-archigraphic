import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    Query,
    UploadedFile,
    UseInterceptors,
    NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express'; // Intercepts file uploads in routes using Multer under the hood
import { diskStorage } from 'multer'; // Provides control over storing uploaded files, such as destination and filename


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // Method: create
    // Route: POST /products
    // Parameters:
    // - file: Uploaded product image.
    // - createProductDto: Object containing product info.
    // Returns: The newly created Product object.
    // Purpose: Adds a new product with image to the database.
    @Post()
    @UseInterceptors(
        FileInterceptor('productImage', {
            storage: diskStorage({
                destination: './public',
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
        }),
    )
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
        if (file) {
            createProductDto.productImage = `/${file.originalname}`;
        }
        return this.productsService.create(createProductDto);
    }

    // Method: findAll
    // Route: GET /products
    // Parameters:
    // - category (optional): Query parameter for filtering by category.
    // Returns: Array of products, filtered if category is provided.
    // Purpose: Retrieves all or filtered products.
    @Get()
    findAll(@Query('category') category?: string): Promise<Product[]> {
        if (category) {
            return this.productsService.findByCategory(category);
        }
        return this.productsService.findAll();
    }

    // Method: findOne
    // Route: GET /products/:id
    // Parameters:
    // - id: ID of the product.
    // Returns: A specific product.
    // Purpose: Retrieves product details by ID.
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        const product = await this.productsService.findOne(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    // Method: update
    // Route: PATCH /products/:id
    // Parameters:
    // - id: Product ID.
    // - file: Uploaded new image.
    // - updateProductDto: Updated fields.
    // Returns: Updated product.
    // Purpose: Updates product info and image.
    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('productImage', {
            storage: diskStorage({
                destination: './public',
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
        }),
    )
    update(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        if (file) {
            updateProductDto.productImage = `/${file.originalname}`;
        }
        return this.productsService.update(id, updateProductDto);
    }

    // Method: remove
    // Route: DELETE /products/:id
    // Parameters:
    // - id: Product ID to delete.
    // Returns: Void promise.
    // Purpose: Deletes product from the database.
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.productsService.remove(id);
    }
}
