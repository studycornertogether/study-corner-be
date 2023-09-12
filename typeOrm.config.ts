import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import PostEntity from './src/posts/post.entity';
import { CreatePost1694278074912 } from './migrations/1694278074912-CreatePost';
import { PostCreationDate1694325562019 } from './migrations/1694325562019-PostCreationDate';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [PostEntity],
  migrations: [CreatePost1694278074912, PostCreationDate1694325562019],
});
