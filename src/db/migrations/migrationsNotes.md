To create tables using migrations, refer to module 35.4 Migrations with knex.

npx knex migrate:make createSuppliersTable

This will create a file like /src/db/migrations/20201129203428_createSuppliersTable.js. Note that your timestamp will be different because you ran the command above at a different time.

Define a table with Knex schema methods
You can use various Knex methods to create a table and define its columns. For example, you can use knex.schema.createTable() to create a new database table. To create a column, you can specify a column type by calling special Knex methods on the table (such as increments(), string(), text(), decimal(), and enum()). You can also specify whether or not a column is nullable and its default values. You can find the full list of schema methods in the Knex documentation.

Do this
Define the suppliers table
Inside of the exports.up function of the newly created migration file, add the following code:

exports.up = function (knex) {
return knex.schema.createTable("suppliers", (table) => {
table.increments("supplier_id").primary(); // Sets supplier_id as the primary key
table.string("supplier_name");
table.string("supplier_address_line_1");
table.string("supplier_address_line_2");
table.string("supplier_city");
table.string("supplier_state");
table.string("supplier_zip");
table.string("supplier_phone");
table.string("supplier_email");
table.text("supplier_notes");
table.string("supplier_type_of_goods");
table.timestamps(true, true); // Adds created_at and updated_at columns
});
};

The table.timestamps(true, true) method will add created_at and updated_at columns. These columns are important because they help keep track of the table's records.

---The timestamps() method has two optional arguments: Passing true as the first argument sets the columns to be a timestamp type. Passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default.

After creating the tables you want, run migrations.
run
npx knex migrate:latest

refer to module 35.5 Seeding data with knex
