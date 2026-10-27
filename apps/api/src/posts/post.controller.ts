import {
  Body,
  Param,
  Get,
  Patch,
  Post,
  Delete,
  Controller,
  UseGuards,
  Query,
} from '@nestjs/common';

import { PostsService } from './post.service';

import { JwtAuthGaurd } from 'src/auth/gaurd/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurd/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import type { CurrentUser as CurrentUserType } from 'src/auth/types/current-user.type';
import { PostQueryDto } from './dto/post-query.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
@UseGuards(JwtAuthGaurd, RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Roles('owner', 'admin', 'editor')
  findAll(@Query() query: PostQueryDto) {
    return this.postsService.findAll(query);
  }

  @Get(':id')
  @Roles('owner', 'admin', 'editor')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  @Roles('owner', 'admin', 'editor')
  create(
    @Body() dto: CreatePostDto,
    @CurrentUser() currentUser: CurrentUserType,
  ) {
    return this.postsService.create(dto, currentUser);
  }

  @Patch(':id')
  @Roles('owner', 'admin', 'editor')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('owner', 'admin', 'editor')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Patch(':id/restore')
  @Roles('owner', 'admin', 'editor')
  restore(@Param('id') id: string) {
    return this.postsService.restore(id);
  }
}
