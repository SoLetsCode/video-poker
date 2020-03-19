exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.uuid("id").primary();
    table
      .string("name")
      .notNullable()
      .defaultTo("robot");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
