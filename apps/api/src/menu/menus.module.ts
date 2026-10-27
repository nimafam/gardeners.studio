import { Module } from '@nestjs/common';

import { MenusController } from './menus.controller';
import { PublicMenusController } from './public-menu.controller';
import { MenusService } from './menus.service';

@Module({
  controllers: [MenusController, PublicMenusController],
  providers: [MenusService],
})
export class MenusModule {}
