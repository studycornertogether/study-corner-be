import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAvatar1695400186832 implements MigrationInterface {
  name = 'UserAvatar1695400186832';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatar" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }
}
