exports.up = function(knex) {
  return knex.schema.createTable("logs", table => {
    table.increments("id").primary();
    table.string("hand").notNullable();
    table.string("playerhold").notNullable();
    table.string("trainerhold").notNullable();
    table.boolean("trainerused").defaultTo(false);
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("outcome")
      .notNullable()
      .defaultTo(0);
    table.string("finalhand").notNullable;
    table.string("result").notNullable;
    table.integer("credit").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("logs");
};
