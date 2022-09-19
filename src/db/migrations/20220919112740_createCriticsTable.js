exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary(); // sets critic_id as the primary key
    table.string("preferred_name");
    table.string("surname");
    table.string("organization_name");
    table.timestamps(true, true); //Adds created_at and updated_at columns
  });
};

// When you undo the migration, exports.down will get invoked, which will call the knex.schema.dropTable() method to drop the suppliers table.
exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};
