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

import { ProjectsService } from './project.service';

import { JwtAuthGaurd } from 'src/auth/gaurd/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurd/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import type { CurrentUser as CurrentUserType } from 'src/auth/types/current-user.type';
import { ProjectQueryDto } from './dto/query-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
@UseGuards(JwtAuthGaurd, RolesGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  @Roles('owner', 'admin', 'editor')
  findAll(@Query() query: ProjectQueryDto) {
    return this.projectService.findAll(query);
  }

  @Get(':id')
  @Roles('owner', 'admin', 'editor')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Post()
  @Roles('owner', 'admin', 'editor')
  create(
    @Body() dto: CreateProjectDto,
    @CurrentUser() currentUser: CurrentUserType,
  ) {
    return this.projectService.create(dto, currentUser);
  }

  @Patch(':id')
  @Roles('owner', 'admin', 'editor')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
    @CurrentUser() currentUser: CurrentUserType,
  ) {
    return this.projectService.update(id, dto, currentUser);
  }

  @Delete(':id')
  @Roles('owner', 'admin', 'editor')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @Patch(':id/restore')
  @Roles('owner', 'admin', 'editor')
  restore(@Param('id') id: string) {
    return this.projectService.restore(id);
  }
}
