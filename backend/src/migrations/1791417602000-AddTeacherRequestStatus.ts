import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeacherRequestStatus1791417602000
  implements MigrationInterface
{
  name = "AddTeacherRequestStatus1791417602000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User_table" ADD COLUMN "teacherRequestStatus" character varying NOT NULL DEFAULT 'none'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User_table" DROP COLUMN "teacherRequestStatus"`
    );
  }
}
