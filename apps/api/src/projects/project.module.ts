import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectsService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
