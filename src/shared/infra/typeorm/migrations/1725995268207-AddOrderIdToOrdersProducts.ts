import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersProducts1725995268207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
      'orders_products',
        new TableColumn(
          {
          name: 'orderId',
          type: 'char',
          length: '36',
          isNullable: true,
          },
        ),
      );

      await queryRunner.createForeignKey(
        'orders_products',
        new TableForeignKey({
          name: 'OrdersProductsOrder',
          columnNames: ['orderId'],
          referencedTableName: 'orders',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');
    await queryRunner.dropColumn('orders_products', 'orderId');
  }

}
