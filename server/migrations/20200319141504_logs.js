exports.up = function(knex) {
  return knex.schema.createTable("logs", table => {
    table.increments("id").primary();
    table.string("hand").notNullable();
    table.string("playerhold").notNullable();
    table.string("trainerhold").notNullable();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("outcome")
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("logs");
};
