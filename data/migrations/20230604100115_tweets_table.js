/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (user) => {
      user.increments("owner_id");
      user.string("owner_name",128).notNullable();
      user.string("email").notNullable().unique();
      user.string("password",128).notNullable();
    })
    .createTable("tweets", (tweet) => {
      tweet.increments("id");
      tweet.string("img_url");
      tweet.string("owner_name",128).notNullable();
      tweet.string("body").notNullable();
      tweet.timestamp("created_at").defaultTo(knex.fn.now());
      tweet
        .integer("owner_id")
        .notNullable()
        .references("owner_id") // eşleştirmeyi gösterir.
        .inTable("users")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
  .dropTableIfExists("tweets")
  .dropTableIfExists("users");
};
