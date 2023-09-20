import { MigrationInterface, QueryRunner } from "typeorm";

export class UserReferral1695099534262 implements MigrationInterface {
    name = 'UserReferral1695099534262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_referral" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "referer_id" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6ae3fd2cc21b481dabc7735016f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "referral_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_b3a2ab3d9733917ef876376be38" UNIQUE ("referral_code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_b3a2ab3d9733917ef876376be38"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "referral_code"`);
        await queryRunner.query(`DROP TABLE "user_referral"`);
    }

}
