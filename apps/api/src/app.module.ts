import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './common/prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { HealthController } from './health/health.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/post.module';
import { MediaModule } from './media/media.module';
import { CategoryModule } from './categories/category.module';
import { TagsModule } from './tags/tags.module';
import { PublicModule } from './public/public.module';
import { SlugModule } from './common/slug/slug.mdule';
import { SettingsModule } from './modules/settings/settings.module';
import { PageModule } from './pages/pages.module';
import { ProjectsModule } from './projects/project.module';
import { MenusModule } from './menu/menus.module';
import { AuditModule } from 'src/modules/audit/audit.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestContextInterceptor } from './common/request-context/request-context.interceptor';
import { RequestContextModule } from './common/request-context/request-context.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UsersModule,
    PostsModule,
    MediaModule,
    CategoryModule,
    TagsModule,
    PublicModule,
    SlugModule,
    SettingsModule,
    PageModule,
    ProjectsModule,
    MenusModule,
    AuditModule,
    RequestContextModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
  ],
})
export class AppModule {}
