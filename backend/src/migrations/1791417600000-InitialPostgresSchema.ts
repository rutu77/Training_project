import { MigrationInterface, QueryRunner } from "typeorm";

const ownershipTable = "_TrainingProjectMigrationObjects";

const createTables = [
  `CREATE TABLE "User_table" (
    "id" SERIAL PRIMARY KEY,
    "name" character varying NOT NULL,
    "email" character varying NOT NULL UNIQUE,
    "password" character varying NOT NULL,
    "role" character varying NOT NULL DEFAULT 'user',
    "profilePicture" character varying,
    "bio" character varying,
    "deleted" boolean NOT NULL DEFAULT false,
    "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE "Course_table" (
    "id" SERIAL PRIMARY KEY,
    "title" character varying NOT NULL,
    "description" character varying NOT NULL,
    "thumbnail" character varying,
    "level" character varying,
    "duration" integer,
    "price" numeric NOT NULL DEFAULT 0,
    "isPublished" boolean NOT NULL DEFAULT false,
    "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" boolean NOT NULL DEFAULT false,
    "creatorId" integer REFERENCES "User_table"("id")
  )`,
  `CREATE TABLE "Enrollment_table" (
    "id" SERIAL PRIMARY KEY,
    "userId" integer REFERENCES "User_table"("id") ON DELETE CASCADE,
    "deleted" boolean NOT NULL DEFAULT false,
    "course_id" integer REFERENCES "Course_table"("id") ON DELETE CASCADE,
    "enrollment_date" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" character varying NOT NULL DEFAULT 'in_progress'
  )`,
  `CREATE TABLE "Lesson_table174" (
    "id" SERIAL PRIMARY KEY,
    "title" character varying NOT NULL,
    "videoUrl" character varying,
    "duration" integer,
    "deleted" boolean NOT NULL DEFAULT false,
    "completed" boolean NOT NULL DEFAULT false,
    "course_id" integer REFERENCES "Course_table"("id") ON DELETE CASCADE
  )`,
  `CREATE TABLE "Quiz_table" (
    "id" SERIAL PRIMARY KEY,
    "title" character varying NOT NULL,
    "deleted" boolean NOT NULL DEFAULT false,
    "course_id" integer REFERENCES "Course_table"("id") ON DELETE CASCADE
  )`,
  `CREATE TABLE "Review_table" (
    "id" SERIAL PRIMARY KEY,
    "userId" integer REFERENCES "User_table"("id") ON DELETE CASCADE,
    "course_id" integer REFERENCES "Course_table"("id") ON DELETE CASCADE,
    "rating" integer NOT NULL,
    "comment" character varying,
    "deleted" boolean NOT NULL DEFAULT false
  )`,
  `CREATE TABLE "Comment_table" (
    "id" SERIAL PRIMARY KEY,
    "message" character varying NOT NULL,
    "deleted" boolean NOT NULL DEFAULT false,
    "userId" integer REFERENCES "User_table"("id"),
    "course_id" integer REFERENCES "Course_table"("id")
  )`,
  `CREATE TABLE "Progress_table" (
    "id" SERIAL PRIMARY KEY,
    "userId" integer REFERENCES "User_table"("id") ON DELETE CASCADE,
    "deleted" boolean NOT NULL DEFAULT false,
    "quiz_id" integer REFERENCES "Quiz_table"("id"),
    "attempt" integer NOT NULL DEFAULT 1,
    "score" integer NOT NULL,
    "total" integer NOT NULL,
    "completion" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE "Question_table" (
    "id" SERIAL PRIMARY KEY,
    "question" character varying NOT NULL,
    "options" jsonb NOT NULL,
    "correctAnswer" character varying NOT NULL,
    "explanation" character varying,
    "deleted" boolean NOT NULL DEFAULT false,
    "quiz_id" integer REFERENCES "Quiz_table"("id") ON DELETE CASCADE
  )`,
];

const tableNames = [
  "User_table",
  "Course_table",
  "Enrollment_table",
  "Lesson_table174",
  "Quiz_table",
  "Review_table",
  "Comment_table",
  "Progress_table",
  "Question_table",
];

export class InitialPostgresSchema1791417600000 implements MigrationInterface {
  name = "InitialPostgresSchema1791417600000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "${ownershipTable}" ("object_name" text PRIMARY KEY, "object_kind" text NOT NULL)`
    );

    for (let index = 0; index < createTables.length; index++) {
      const tableName = tableNames[index];
      if (!(await queryRunner.hasTable(tableName))) {
        await queryRunner.query(createTables[index]);
        await queryRunner.query(
          `INSERT INTO "${ownershipTable}" ("object_name", "object_kind") VALUES ($1, 'table')`,
          [`table:${tableName}`]
        );
      }
    }

    if (!(await queryRunner.hasColumn("Course_table", "isPublished"))) {
      await queryRunner.query(
        `ALTER TABLE "Course_table" ADD COLUMN "isPublished" boolean NOT NULL DEFAULT false`
      );
      await queryRunner.query(
        `INSERT INTO "${ownershipTable}" ("object_name", "object_kind") VALUES ('column:Course_table.isPublished', 'column')`
      );
    }

    const optionsColumn = await queryRunner.query(
      `SELECT data_type FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = 'Question_table' AND column_name = 'options'`
    );
    if (
      optionsColumn[0]?.data_type === "text" ||
      optionsColumn[0]?.data_type === "character varying"
    ) {
      await queryRunner.query(
        `ALTER TABLE "Question_table" ALTER COLUMN "options" TYPE jsonb USING to_jsonb(string_to_array("options", ','))`
      );
      await queryRunner.query(
        `INSERT INTO "${ownershipTable}" ("object_name", "object_kind") VALUES ('column-type:Question_table.options', 'column-type')`
      );
    } else if (
      optionsColumn[0] &&
      optionsColumn[0].data_type !== "jsonb"
    ) {
      throw new Error(
        `Cannot migrate Question_table.options from PostgreSQL type ${optionsColumn[0].data_type}`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable(ownershipTable))) return;
    const ownedObjects = (await queryRunner.query(
      `SELECT "object_name", "object_kind" FROM "${ownershipTable}"`
    )) as Array<{ object_name: string; object_kind: string }>;

    for (const object of ownedObjects) {
      if (object.object_kind === "column-type") {
        await queryRunner.query(
          `ALTER TABLE "Question_table" ALTER COLUMN "options" TYPE text USING (SELECT string_agg(value, ',') FROM jsonb_array_elements_text("options") AS item(value))`
        );
      } else if (object.object_kind === "column") {
        await queryRunner.query(
          `ALTER TABLE "Course_table" DROP COLUMN "isPublished"`
        );
      }
    }

    for (const object of ownedObjects.filter((item) => item.object_kind === "table").reverse()) {
      await queryRunner.query(`DROP TABLE "${object.object_name}"`);
    }
    await queryRunner.query(`DROP TABLE "${ownershipTable}"`);
  }
}
