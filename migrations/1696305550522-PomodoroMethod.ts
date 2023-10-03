import { MigrationInterface, QueryRunner } from "typeorm";

export class PomodoroMethod1696305550522 implements MigrationInterface {
    name = 'PomodoroMethod1696305550522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pomodoro_history" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "time_start" TIMESTAMP WITH TIME ZONE NOT NULL, "time_stop" TIMESTAMP WITH TIME ZONE NOT NULL, "focus_time" integer NOT NULL, "session" integer NOT NULL, "type_of_session" character varying NOT NULL, "status" character varying NOT NULL, "time_remain" integer NOT NULL, CONSTRAINT "PK_4f32e9a456f8683ebd6ba9b95a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pomodoro_setting" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "focus_time" integer NOT NULL, "short_break_time" integer NOT NULL, "long_break_time" integer NOT NULL, "number_of_sessions" integer NOT NULL, "long_break_interval" integer NOT NULL DEFAULT '4', CONSTRAINT "REL_d44c8e9c69e7dab943117ff92b" UNIQUE ("user_id"), CONSTRAINT "PK_e4475d720df280070eefddeecb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pomodoro_history" ADD CONSTRAINT "FK_5c40e945300a0ce408815258c8f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pomodoro_setting" ADD CONSTRAINT "FK_d44c8e9c69e7dab943117ff92be" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pomodoro_setting" DROP CONSTRAINT "FK_d44c8e9c69e7dab943117ff92be"`);
        await queryRunner.query(`ALTER TABLE "pomodoro_history" DROP CONSTRAINT "FK_5c40e945300a0ce408815258c8f"`);
        await queryRunner.query(`DROP TABLE "pomodoro_setting"`);
        await queryRunner.query(`DROP TABLE "pomodoro_history"`);
    }

}
