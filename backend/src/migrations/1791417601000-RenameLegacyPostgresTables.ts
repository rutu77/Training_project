import { MigrationInterface, QueryRunner } from "typeorm";

const legacyTables = [
  ["User_table147", "User_table"],
  ["Course_table147", "Course_table"],
  ["Enrollment_table147", "Enrollment_table"],
  ["Lesson_table174", "Lesson_table"],
  ["Quiz_table147", "Quiz_table"],
  ["Review_table147", "Review_table"],
  ["Comment_table147", "Comment_table"],
  ["Progress_table147", "Progress_table"],
  ["Question_table147", "Question_table"],
] as const;

export class RenameLegacyPostgresTables1791417601000
  implements MigrationInterface
{
  name = "RenameLegacyPostgresTables1791417601000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const [legacyName, currentName] of legacyTables) {
      const hasLegacyTable = await queryRunner.hasTable(legacyName);
      const hasCurrentTable = await queryRunner.hasTable(currentName);

      if (hasLegacyTable && hasCurrentTable) {
        throw new Error(
          `Both "${legacyName}" and "${currentName}" exist; refusing to guess which table contains the application data`
        );
      }
      if (!hasLegacyTable && !hasCurrentTable) {
        throw new Error(
          `Neither "${legacyName}" nor "${currentName}" exists; cannot safely complete the table rename`
        );
      }
      if (hasLegacyTable) {
        await queryRunner.renameTable(legacyName, currentName);
      }
    }

    const [optionsColumn] = (await queryRunner.query(
      `SELECT data_type FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = 'Question_table' AND column_name = 'options'`
    )) as Array<{ data_type: string }>;

    if (optionsColumn?.data_type === "jsonb") return;
    if (
      optionsColumn?.data_type !== "text" &&
      optionsColumn?.data_type !== "character varying"
    ) {
      throw new Error(
        `Cannot safely convert Question_table.options from PostgreSQL type ${optionsColumn?.data_type ?? "unknown"}`
      );
    }

    await queryRunner.query(
      `ALTER TABLE "Question_table" ALTER COLUMN "options" TYPE jsonb USING to_jsonb(string_to_array("options", ','))`
    );
  }

  public async down(): Promise<void> {
    throw new Error(
      "This migration is intentionally irreversible because converting legacy comma-delimited options to jsonb cannot be losslessly reversed"
    );
  }
}
