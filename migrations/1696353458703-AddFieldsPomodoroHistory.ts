import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldsPomodoroHistory1696353458703 implements MigrationInterface {
    name = 'AddFieldsPomodoroHistory1696353458703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pomodoro_history" DROP COLUMN "time_start"`);
        await queryRunner.query(`ALTER TABLE "pomodoro_history" DROP COLUMN "time_stop"`);
        await queryRunner.query(`ALTER TABLE "pomodoro_history" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pomodoro_history" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "pomodoro_history" ADD "time_stop" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pomodoro_history" ADD "time_start" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
