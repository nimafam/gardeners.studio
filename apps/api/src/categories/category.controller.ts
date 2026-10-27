import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { JwtAuthGaurd } from 'src/auth/gaurd/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurd/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('categories')
@UseGuards(JwtAuthGaurd, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Roles('owner', 'admin', 'editor')
  findAll(@Query() query: CategoryQueryDto) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  @Roles('owner', 'admin', 'editor')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  @Roles('owner', 'admin', 'editor')
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Patch(':id')
  @Roles('owner', 'admin', 'editor')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @Roles('owner', 'admin', 'editor')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Patch(':id/restore')
  @Roles('owner', 'admin')
  restore(@Param('id') id: string) {
    return this.categoryService.restore(id);
  }
}
