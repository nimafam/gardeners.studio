import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugService {
  generate(value: string): string {
    return slugify(value, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
}
