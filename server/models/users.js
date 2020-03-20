const bookshelf = require("../bookshelf");

const Users = bookshelf.model("Users", {
  tableName: "users",
  inventories: function() {
    return this.hasMany("Logs");
  }
});

module.exports = Users;
