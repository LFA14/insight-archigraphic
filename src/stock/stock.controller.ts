import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
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

    @Post()
    create(@Body() createStockDto: CreateStockDto): Promise<Stock> {
        return this.stockService.create(createStockDto);
    }

    @Get()
    findAll(): Promise<Stock[]> {
        return this.stockService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Stock> {
        return this.stockService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateStockDto: UpdateStockDto
    ): Promise<Stock> {
        return this.stockService.update(id, updateStockDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.stockService.remove(id);
    }
}
