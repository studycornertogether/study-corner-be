import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPlanetUser1695803187849 implements MigrationInterface {
    name = 'AddPlanetUser1695803187849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "planet" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "planet" ADD CONSTRAINT "FK_ae941bf5871aaf01afa4cb7bcff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "planet" DROP CONSTRAINT "FK_ae941bf5871aaf01afa4cb7bcff"`);
        await queryRunner.query(`ALTER TABLE "planet" DROP COLUMN "user_id"`);
    }

}
