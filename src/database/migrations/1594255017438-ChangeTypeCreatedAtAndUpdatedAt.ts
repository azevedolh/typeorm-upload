import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeTypeCreatedAtAndUpdatedAt1594255017438
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('transactions', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
      }),
    ]);

    await queryRunner.addColumns('transactions', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('transactions', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
    ]);

    await queryRunner.addColumns('transactions', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);
  }
}
