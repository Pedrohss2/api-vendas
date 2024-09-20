import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrders1725994145757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true
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
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('orders')
    }

}
