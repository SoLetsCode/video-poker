exports.up = function(knex) {
  return knex.schema.createTable("logs", table => {
    table.uuid("id").primary();
    table.string("hand").notNullable();
    table.string("playerhold").notNullable();
    table.string("trainerhold").notNullable();
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("outcome")
      .notNullable()
      .defaultTo(0);
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("logs");
};
