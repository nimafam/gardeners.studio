import { Controller, Get, Param, ParseEnumPipe } from '@nestjs/common';

import { MenusService } from './menus.service';

import { MenuLocation } from '@prisma/client';

@Controller('public/menus')
export class PublicMenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get(':location')
  findByLocation(
    @Param('location', new ParseEnumPipe(MenuLocation))
    location: MenuLocation,
  ) {
    return this.menusService.findPublicByLocation(location);
  }
}
