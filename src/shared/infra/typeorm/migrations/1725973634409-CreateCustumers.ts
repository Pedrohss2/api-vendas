import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustumers1725973634409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {  
    await queryRunner.createTable(new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '255'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP '
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP '
          },
        ],
      }),
    );
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers')
  }

}
