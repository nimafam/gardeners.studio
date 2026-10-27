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

import { PagesService } from './pages.service';

import { JwtAuthGaurd } from 'src/auth/gaurd/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurd/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { CurrentUser as CurrentUserType } from 'src/auth/types/current-user.type';

import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dot';
import { PageQueryDto } from './dto/query-page.dto';

@Controller('pages')
@UseGuards(JwtAuthGaurd, RolesGuard)
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @Roles('owner', 'admin', 'editor')
  findAll(@Query() query: PageQueryDto) {
    return this.pagesService.findAll(query);
  }

  @Get(':id')
  @Roles('owner', 'admin', 'editor')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Post()
  @Roles('owner', 'admin', 'editor')
  create(
    @Body() dto: CreatePageDto,
    @CurrentUser() currentUser: CurrentUserType,
  ) {
    return this.pagesService.create(dto, currentUser);
  }

  @Patch(':id')
  @Roles('owner', 'admin', 'editor')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePageDto,
    @CurrentUser() currentUser: CurrentUserType,
  ) {
    return this.pagesService.update(id, dto, currentUser);
  }

  @Delete(':id')
  @Roles('owner', 'admin', 'editor')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }

  @Patch(':id/restore')
  @Roles('owner', 'admin', 'editor')
  restore(@Param('id') id: string) {
    return this.pagesService.restore(id);
  }
}
