import { Controller, Get, Param, Query } from '@nestjs/common';
import { PublicService } from './public.service';
import { PostQueryDto } from 'src/posts/dto/post-query.dto';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('posts')
  findPosts(@Query() query: PostQueryDto) {
    return this.publicService.findPosts(query);
  }

  @Get('posts/:slug')
  findPostBySlug(@Param('slug') slug: string) {
    return this.publicService.findPostBySlug(slug);
  }

  @Get('categories')
  findCategories() {
    return this.publicService.findCategories();
  }

  @Get('tags')
  findTags() {
    return this.publicService.findTags();
  }

  @Get('home')
  findHome() {
    return this.publicService.findHome();
  }

  @Get('settings')
  findSettings() {
    return this.publicService.findPublicSettings();
  }
}
