const usersData = [
  { name: "robot", hash: "robot" },
  { name: "guest", hash: "guest" }
];

const logsData = [
  {
    hand: JSON.stringify(["qh", "qc", "4h", "3s", "5s"]),
    playerhold: JSON.stringify(["qh", "qc", "--", "--", "--"]),
    trainerhold: JSON.stringify(["qh", "qc", "--", "--", "--"]),
    trainerused: false,
    finalhand: JSON.stringify(["qh", "qc", "5h", "ad", "kh"]),
    result: "jh",
    outcome: 5,
    credit: 500
  }
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert(usersData);
    })
    .then(() => {
      return knex("logs").del();
    })
    .then(() => {
      // Inserts seed entries
      return knex("users")
        .pluck("id")
        .then(usersIds => {
          return usersIds;
        });
    })
    .then(usersIds => {
      const logsDataWithUsersIds = logsData.map(log => {
        log.user_id = usersIds[Math.floor(Math.random() * usersIds.length)];
        return log;
      });
      return knex("logs").insert(logsDataWithUsersIds);
    });
};
