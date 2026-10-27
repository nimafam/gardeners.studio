import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { MenusService } from './menus.service';

import { JwtAuthGaurd } from 'src/auth/gaurd/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurd/roles.guard';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import type { CurrentUser as CurrentUserType } from 'src/auth/types/current-user.type';

import { MenuQueryDto } from './dto/query-menu.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

import { CreateMenuItemDto } from 'src/menu-items/dto/create-menu-item.dto';
import { UpdateMenuItemDto } from 'src/menu-items/dto/update-menu-item.dto';
import { ReorderMenuItemsDto } from 'src/menu-items/dto/reorder-menu-items.dto';

@Controller('menus')
@UseGuards(JwtAuthGaurd, RolesGuard)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  // Menu CRUD

  @Get()
  @Roles('owner', 'admin', 'editor')
  findAll(@Query() query: MenuQueryDto) {
    return this.menusService.findAll(query);
  }

  @Get(':id')
  @Roles('owner', 'admin', 'editor')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Post()
  @Roles('owner', 'admin', 'editor')
  create(@Body() dto: CreateMenuDto) {
    return this.menusService.create(dto);
  }

  @Patch(':id')
  @Roles('owner', 'admin', 'editor')
  update(@Param('id') id: string, @Body() dto: UpdateMenuDto) {
    return this.menusService.update(id, dto);
  }

  @Delete(':id')
  @Roles('owner', 'admin', 'editor')
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }

  @Patch(':id/restore')
  @Roles('owner', 'admin', 'editor')
  restore(@Param('id') id: string) {
    return this.menusService.restore(id);
  }

  // Menu Items

  @Post(':menuId/items')
  @Roles('owner', 'admin', 'editor')
  createItem(@Param('menuId') menuId: string, @Body() dto: CreateMenuItemDto) {
    return this.menusService.createItem(menuId, dto);
  }

  @Patch('items/:id')
  @Roles('owner', 'admin', 'editor')
  updateItem(@Param('id') id: string, @Body() dto: UpdateMenuItemDto) {
    return this.menusService.updateItem(id, dto);
  }

  @Delete('items/:id')
  @Roles('owner', 'admin', 'editor')
  removeItem(@Param('id') id: string) {
    return this.menusService.removeItem(id);
  }

  @Patch('items/:id/restore')
  @Roles('owner', 'admin', 'editor')
  restoreItem(@Param('id') id: string) {
    return this.menusService.restoreItem(id);
  }

  @Patch(':menuId/items/reorder')
  @Roles('owner', 'admin', 'editor')
  reorderItems(
    @Param('menuId') menuId: string,
    @Body() dto: ReorderMenuItemsDto,
  ) {
    return this.menusService.reorderItems(menuId, dto);
  }
}
