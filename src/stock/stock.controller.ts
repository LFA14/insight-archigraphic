import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
    Patch,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';

@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) { }

    // Method: create
    // Route: POST /stock
    // Parameters:
    // - createStockDto: Data Transfer Object containing new stock details.
    // Returns: The newly created Stock object.
    // Purpose: Creates a new stock record in the database.
    @Post()
    create(@Body() createStockDto: CreateStockDto): Promise<Stock> {
        return this.stockService.create(createStockDto);
    }

    // Method: findAll
    // Route: GET /stock
    // Parameters: None
    // Returns: An array of Stock objects.
    // Purpose: Retrieves all stock records from the database.
    @Get()
    findAll(): Promise<Stock[]> {
        return this.stockService.findAll();
    }

    // Method: findOne
    // Route: GET /stock/:id
    // Parameters:
    // - id: The ID of the stock to retrieve.
    // Returns: The requested Stock object if found.
    // Purpose: Retrieves a specific stock record by its ID.
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Stock> {
        return this.stockService.findOne(id);
    }

    // Method: update
    // Route: PATCH /stock/:id
    // Parameters:
    // - id: The ID of the stock to update.
    // - updateStockDto: Data Transfer Object containing fields to update.
    // Returns: The updated Stock object.
    // Purpose: Updates an existing stock record by its ID.
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateStockDto: UpdateStockDto
    ): Promise<Stock> {
        return this.stockService.update(id, updateStockDto);
    }

    // Method: remove
    // Route: DELETE /stock/:id
    // Parameters:
    // - id: The ID of the stock to delete.
    // Returns: void
    // Purpose: Deletes a stock record from the database by its ID.
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.stockService.remove(id);
    }
}
