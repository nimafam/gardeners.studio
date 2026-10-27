import {
  Controller,
  Post,
  Get,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Param,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { MediaService } from './media.service';
import { JwtAuthGaurd } from 'src/auth/gaurd/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurd/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { CurrentUser as CurrentUserType } from 'src/auth/types/current-user.type';
import { existsSync, mkdirSync } from 'fs';
import { MediaQueryDto } from './dto/media-query.dto';
import { UploadMediaDto } from './dto/upload-media.dto';

@Controller('media')
@UseGuards(JwtAuthGaurd, RolesGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('uploads')
  @Roles('owner', 'admin', 'editor')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          const now = new Date();
          const year = String(now.getFullYear());
          const month = String(now.getMonth() + 1).padStart(2, '0');

          const uploadPath = join(process.cwd(), 'uploads', year, month);

          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }

          callback(null, uploadPath);
        },
        filename: (_req, file, callback) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: CurrentUserType,
    @Body() dto: UploadMediaDto,
  ) {
    return this.mediaService.createFromUploadFile(file, user, dto);
  }

  @Get()
  @Roles('owner', 'admin', 'editor')
  findAll(@Query() query: MediaQueryDto) {
    return this.mediaService.findAll(query);
  }

  @Get(':id')
  @Roles('owner', 'admin', 'editor')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Delete(':id')
  @Roles('owner', 'admin', 'editor')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }

  @Patch(':id/restore')
  @Roles('owner', 'admin', 'editor')
  restore(@Param('id') id: string) {
    return this.mediaService.restore(id);
  }

  @Patch(':id/update')
  @Roles('owner', 'admin', 'editor')
  update(@Param('id') id: string, @Body() dto: UploadMediaDto) {
    return this.mediaService.update(id, dto);
  }
}
