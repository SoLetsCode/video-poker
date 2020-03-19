exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("logs")
    .del()
    .then(function() {
      let userID = knex("users").pluck("id");
      console.log(userID);
      // Inserts seed entries
      return knex("logs").insert([
        {
          id: "15",
          hand: JSON.stringify(["jh", "jc", "js", "kh", "kc"]),
          playerhold: JSON.stringify(["jh", "jc", "js", "kh", "kc"]),
          trainerhold: JSON.stringify(["jh", "jc", "js", "kh", "kc"]),
          user_id: "12",
          outcome: 15
        }
      ]);
    });
};
