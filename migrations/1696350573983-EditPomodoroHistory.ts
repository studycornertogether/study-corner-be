import { MigrationInterface, QueryRunner } from "typeorm";

export class EditPomodoroHistory1696350573983 implements MigrationInterface {
    name = 'EditPomodoroHistory1696350573983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pomodoro_history" ALTER COLUMN "time_stop" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pomodoro_history" DROP COLUMN "time_remain"`);
        await queryRunner.query(`ALTER TABLE "pomodoro_history" ADD "time_remain" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pomodoro_history" DROP COLUMN "time_remain"`);
        await queryRunner.query(`ALTER TABLE "pomodoro_history" ADD "time_remain" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pomodoro_history" ALTER COLUMN "time_stop" SET NOT NULL`);
    }

}
