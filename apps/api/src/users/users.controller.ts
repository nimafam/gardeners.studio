import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  Query,
  Post,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { JwtAuthGaurd } from 'src/auth/gaurd/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurd/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { UserQueryDto } from './dto/user-dto.query';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserRolesDto } from './dto/udpate-user-roles.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGaurd, RolesGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('owner', 'admin')
  findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @Roles('owner', 'admin')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id/status')
  @Roles('owner', 'admin')
  updateSattus(@Param('id') id: string, @Body() dto: UpdateUserStatusDto) {
    return this.usersService.updateStatus(id, dto);
  }

  @Patch(':id/roles')
  @Roles('owner')
  updateRoles(@Param('id') id: string, @Body() dto: UpdateUserRolesDto) {
    return this.usersService.updateRoles(id, dto);
  }

  @Post()
  @Roles('owner', 'admin')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.Create(dto);
  }

  @Patch(':id')
  @Roles('owner', 'admin')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Roles('owner', 'admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id/restore')
  @Roles('owner', 'admin')
  restore(@Param('id') id: string) {
    return this.usersService.restore(id);
  }
}
