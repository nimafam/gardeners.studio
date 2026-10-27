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

import { TagsService } from './tags.service';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagQueryDto } from './dto/tag-query.dto';

import { JwtAuthGaurd } from 'src/auth/gaurd/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurd/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('tags')
@UseGuards(JwtAuthGaurd, RolesGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @Roles('owner', 'admin', 'editor')
  findAll(
    @Query()
    query: TagQueryDto,
  ) {
    return this.tagsService.findAll(query);
  }

  @Get(':id')
  @Roles('owner', 'admin', 'editor')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.tagsService.findOne(id);
  }

  @Post()
  @Roles('owner', 'admin', 'editor')
  create(
    @Body()
    dto: CreateTagDto,
  ) {
    return this.tagsService.create(dto);
  }

  @Patch(':id')
  @Roles('owner', 'admin', 'editor')
  update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateTagDto,
  ) {
    return this.tagsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('owner', 'admin', 'editor')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.tagsService.remove(id);
  }

  @Patch(':id/restore')
  @Roles('owner', 'admin')
  restore(
    @Param('id')
    id: string,
  ) {
    return this.tagsService.restore(id);
  }
}
