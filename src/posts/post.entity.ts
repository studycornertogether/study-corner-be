import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class PostEntity {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;
}

export default PostEntity;
