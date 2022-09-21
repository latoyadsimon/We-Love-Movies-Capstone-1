refer to module 35.5 Seeding data with Knex
this project already came with seeds, so we did not have to make them on our own.

-----information on makings seeds----
Seed the database
Seed files allow you to populate your database with test or seed data, independent of your migration files. To create seed data, you will have to follow a few steps:

1. Define a location for storing your seed scripts

2. Create the seed scripts

3. Update the seed scripts

4. Run the seed scripts

Where to store your seed scripts
Knex creates seed scripts in the directory specified in the knexfile.js for the current environment. For example, the following sample seed configuration stores the seed scripts at ./seeds/dev for the development environment:

<!--
development: {
  client: ...,
  connection: { ... },
  seeds: {
    directory: './seeds/dev'
  }
} -->

If seeds.directory isn't defined in the knexfile.js, scripts are created in ./seeds by default.

Do this
Store seed scripts at ./src/db/seeds
Update the knexfile.js as follows:

<!-- const path = require("path");
require("dotenv").config();
const { DATABASE_URL } = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
+    seeds: {
+      directory: path.join(__dirname, "src", "db", "seeds"),
+    },
  },
}; -->

Now, Knex will create and store the seed files at ./src/db/seeds.

The CLI syntax for creating a seed file is as follows:

npx knex seed:make seed_name

seed files may rely on previous seeds, you should also keep seed files in order.

Create the seed scripts for the products, suppliers, categories, and products_categories tables
Because you have four tables that you want to seed, you need to create four seed files. Run the following commands, one after the other:

npx knex seed:make 00-suppliers
npx knex seed:make 01-products
npx knex seed:make 02-categories
npx knex seed:make 03-products_categories

Because the products table depends on the supplier_id column from the suppliers table, the products table will have to be created after the suppliers table. A straightforward way to maintain this order is to add an incremental number at the beginning of the seed files.

So, the first seed file will start with 01, the next seed file will start with 02, and so on and so forth. Seed files are executed in order. Unlike migrations, every seed file will be executed when you run the command.

---

Run the seed scripts
To run seed files, execute the following:

npx knex seed:run

\*\*refer back to module 35.5 seeding data with knex for more information.
