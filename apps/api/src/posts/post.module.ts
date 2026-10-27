import { Module } from '@nestjs/common';
import { PostsController } from '../posts/post.controller';
import { PostsService } from '../posts/post.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
