const usersData = [{ name: "jeremy" }, { name: "robot" }, { name: "jack" }];

const logsData = [
  {
    hand: JSON.stringify(["qh", "qc", "4h", "3s", "5s"]),
    playerhold: JSON.stringify(["qh", "qc", "--", "--", "--"]),
    trainerhold: JSON.stringify(["qh", "qc", "--", "--", "--"]),
    trainerused: false,
    outcome: 5
  },
  {
    hand: JSON.stringify(["10c", "3d", "4h", "3s", "5s"]),
    playerhold: JSON.stringify(["--", "--", "--", "--", "--"]),
    trainerhold: JSON.stringify(["--", "3d", "--", "3s", "--"]),
    trainerused: true,
    outcome: 0
  },
  {
    hand: JSON.stringify(["10c", "10d", "10h", "3s", "5s"]),
    playerhold: JSON.stringify(["--", "--", "--", "--", "--"]),
    trainerhold: JSON.stringify(["10c", "10d", "10h", "--", "--"]),
    trainerused: false,
    outcome: 30
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
